import Stripe from 'stripe';
import purchase from "./models/purchases";
import { client, urlFor } from '../../lib/client';

global.webhook = {
    app: null
};



const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
// Using Express
export async function webhookListen() {


    if (global.webhook && global.webhook.app) {
        console.log("Connected from previous");
        return global.webhook.app;
    } else
    {
        const app = require('express')();

// Use body-parser to retrieve the raw body as a buffer
        const bodyParser = require('body-parser');
        app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
            const payload = request.body;

            console.log("Got payload: " + payload);
            
            if (payload) {
                const payloadData = JSON.parse(payload)
                console.log(payloadData.data)
                console.log(payloadData.data.object.id)
                if (payloadData.type === "checkout.session.completed")
                {
                    let daa = await purchase.findOneAndUpdate({"stripeId": payloadData.data.object.id}, {stage: "Complete"}, {upsert: true, new: true})
                    console.log(daa)
                    if (daa) {
                        daa.items.forEach((item) => {
                            client.patch(item.itemId).dec({quantity: item.quantity}).commit()
                        })
                    }
                }
            }


            response.status(200).end();
        });

        app.listen(4242, () => console.log('Running on port 4242'));

        global.webhook = {
            app: app,
        };
    }
}
