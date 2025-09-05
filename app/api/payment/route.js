import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: "rzp_live_R5X3mt2251rX6I",
  key_secret: "byfJut8krJr56bBq4DwcXT3i",
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
