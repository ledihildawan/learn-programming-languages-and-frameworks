import { NextResponse } from 'next/server';

import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {} as any);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    cancel_url: 'http://localhost:3000/cancel',
    line_items: [
      {
        quantity: 1,
        price: 'price_1NxjWVKGN2L8fA4UfdhjfK71',
      },
    ],
    success_url: 'http://localhost:3000/success',
  });

  return NextResponse.json(session);
}
