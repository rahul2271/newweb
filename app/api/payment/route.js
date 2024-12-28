import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.local.RAZORPAY_KEY_ID,
  key_secret: process.env.local.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  const { webinarId, amount } = await request.json();

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paisa
      currency: 'INR',
      receipt: `order_rc_${webinarId}`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
