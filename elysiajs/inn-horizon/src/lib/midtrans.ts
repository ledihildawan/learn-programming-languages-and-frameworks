import Midtrans from 'midtrans-client';

const isProduction = process.env.NODE_ENV === 'production';

export const snap = new Midtrans.Snap({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const core = new Midtrans.CoreApi({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

// src/lib/midtrans.ts (update fungsi)
export async function refundMidtrans(
  transactionId: string,
  amount: number,
  reason: string = 'Customer cancelled booking'
) {
  try {
    const refundResponse = await core.transaction.refund(transactionId, {
      amount,
      reason,
    });
    return { success: true, data: refundResponse };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
