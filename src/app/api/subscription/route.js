// app/api/subscribe/route.js
export async function POST(req) {
    const body = await req.json();
    
    // Directly handle the subscription instead of proxying
    try {
      const exists = await Subscription.findOne({ endpoint: body.endpoint });
      if (!exists) {
        await Subscription.create(body);
        console.log('✅ New subscription saved');
      }
      return new Response(JSON.stringify({ message: 'Subscribed' }), { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ message: 'Failed to subscribe' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }