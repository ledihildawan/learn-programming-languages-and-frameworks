// src/routes/booking.ts  (atau di file route booking-mu)
import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { refundMidtrans } from '../../lib/midtrans';

export const bookingRoute = new Elysia({ prefix: '/booking' })
  // ... route lain

  // POST /booking/:id/cancel → auto refund kalau sudah dibayar
  .post(
    '/:id/cancel',
    async ({ params: { id }, set }) => {
      const booking = await db.booking.findUnique({
        where: { id },
        include: { payment: true },
      });

      if (!booking) {
        set.status = 404;
        return { error: 'Booking tidak ditemukan' };
      }

      if (booking.status !== 'PAID') {
        // Kalau belum dibayar → langsung cancel
        await db.booking.update({
          where: { id },
          data: { status: 'CANCELLED' },
        });
        return { message: 'Booking dibatalkan' };
      }

      // Kalau sudah PAID → proses refund dulu
      if (booking.payment?.provider !== 'MIDTRANS' || !booking.payment.providerId) {
        set.status = 400;
        return { error: 'Pembayaran bukan dari Midtrans atau tidak valid' };
      }

      const refund = await refundMidtrans(
        booking.payment.providerId,
        Number(booking.totalPrice),
        `Cancel booking ${booking.id} oleh customer`
      );

      if (!refund.success) {
        set.status = 500;
        return { error: 'Refund gagal', details: refund.error };
      }

      // Refund berhasil → update status
      await db.$transaction(async (tx) => {
        await tx.booking.update({
          where: { id },
          data: { status: 'CANCELLED' },
        });

        await tx.payment.update({
          where: { bookingId: id },
          data: {
            status: 'REFUNDED',
          },
        });
      });

      return {
        message: 'Booking dibatalkan & refund berhasil diproses',
        refund: refund.data,
      };
    },
    {
      params: t.Object({ id: t.String() }),
    }
  );
