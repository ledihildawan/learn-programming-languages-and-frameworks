import { Xendit } from 'xendit-node';

const xenditClient = new Xendit({
  secretKey: 'xnd_development_EQKGzwPzcd7BYwdWqrwddFUYd528gWapwFrC5FKUqZjgNxAnnrq0i4NIkuFJPmV', // Retrieve from Xendit Dashboard
});

async function createPaymentRequest() {
  try {
    const paymentRequest = await xenditClient.PaymentRequest.createPaymentRequest({
      referenceId: 'your-unique-reference-id',
      type: 'PAY', // Or PAY_AND_SAVE, TOKENIZE, etc.
      country: 'ID', // Or other supported country
      currency: 'IDR', // Or other supported currency
      requestAmount: 100000, // Example amount
      captureMethod: 'AUTOMATIC',
      channelCode: 'ID_OVO', // Example e-wallet
      channelProperties: {
        successRedirectUrl: 'https://yourwebsite.com/success',
        failureRedirectUrl: 'https://yourwebsite.com/failure',
      },
      // ... other necessary parameters based on payment channel
    });
    console.log('Payment Request created:', paymentRequest);
    // Redirect user to invoice_url if provided in response for hosted checkout
  } catch (error) {
    console.error('Error creating payment request:', error);
  }
}

createPaymentRequest();
