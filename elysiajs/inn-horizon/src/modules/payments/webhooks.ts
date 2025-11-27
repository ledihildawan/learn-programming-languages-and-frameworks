// src/routes/webhook.ts
import { Elysia } from 'elysia';
import { db } from '../../db';
import { core } from '../../lib/midtrans';

export const webhookRoute = new Elysia().post('/midtrans/webhook', async ({ body, set }) => {
  try {
    // ← INI CARA RESMI MIDTRANS (otomatis cek signature!)
    const statusResponse = await core.transaction.notification(body);

    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log(`Webhook diterima: ${orderId} → ${transactionStatus}`);

    if (transactionStatus === 'settlement' && fraudStatus === 'accept') {
      await db.$transaction(async (tx) => {
        await tx.booking.update({
          where: { id: orderId },
          data: { status: 'PAID' },
        });

        await tx.payment.upsert({
          where: { bookingId: orderId },
          create: {
            bookingId: orderId,
            amount: Number(statusResponse.gross_amount),
            provider: 'MIDTRANS',
            providerId: statusResponse.transaction_id,
            status: 'SETTLED',
            paidAt: new Date(),
          },
          update: {
            status: 'SETTLED',
            providerId: statusResponse.transaction_id,
            paidAt: new Date(),
          },
        });
      });
    } else if (['deny', 'cancel', 'expire'].includes(transactionStatus)) {
      await db.booking.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' },
      });
    } else if (transactionStatus === 'refund') {
      await db.$transaction(async (tx) => {
        await tx.booking.update({
          where: { id: orderId },
          data: { status: 'REFUNDED' },
        });
        await tx.payment.update({
          where: { bookingId: orderId },
          data: { status: 'REFUNDED' },
        });
      });
    }

    return { status: 'ok' };
  } catch (err: any) {
    console.error('Webhook gagal:', err.message);
    set.status = 400;
    return { error: err.message };
  }
});
