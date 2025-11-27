// src/routes/payment.ts
import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { snap } from '../../lib/midtrans';

export const paymentsRoute = new Elysia({ prefix: '/payments' }).post(
  '/create/:bookingId',
  async ({ params: { bookingId }, set }) => {
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        room: { include: { hotel: true } },
      },
    });

    if (!booking || booking.status !== 'PENDING') {
      set.status = 400;
      return { error: 'Booking tidak valid atau sudah dibayar' };
    }

    const parameter = {
      transaction_details: {
        order_id: booking.id, // unik, pakai booking.id
        gross_amount: Number(booking.totalPrice),
      },
      customer_details: {
        first_name: booking.guestName.split(' ')[0],
        last_name: booking.guestName.split(' ').slice(1).join(' ') || '',
        email: booking.guestEmail || booking.user.email,
        phone: booking.guestPhone,
      },
      item_details: [
        {
          id: booking.room.id,
          price: Number(booking.room.price),
          quantity: booking.nights,
          name: `${booking.room.name} – ${booking.room.hotel.name}`,
        },
      ],
      callbacks: {
        finish: `${process.env.APP_URL}/booking/${booking.id}/success`,
        error: `${process.env.APP_URL}/booking/${booking.id}/error`,
        pending: `${process.env.APP_URL}/booking/${booking.id}/pending`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    // Simpan token untuk redirect
    return {
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    };
  },
  { params: t.Object({ bookingId: t.String() }) }
);
