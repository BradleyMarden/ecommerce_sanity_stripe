import Stripe from 'stripe';
import { client, urlFor } from '../../lib/client';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      let ids =[]
      let quanity =[]
      
      req.body.map((item) => {
        ids.push(item._id)
        quanity.push(item.quantity)
      })
      let ind = 0;
      ids.forEach((id) =>{
        console.log(id)
        client.patch(id).dec({quantity: quanity[ind]}).commit()
        ind++
      })
      console.log("Ids " + ids)
      console.log("quanity " + quanity)
      const query = `*[_id in '${ids}')]`;
      const products = await client.fetch(
          '*[_id in $ids]',
          {ids: ids}
      )
      let index = 0;
      let mapp = products.map((item) => {
        index++
        const img = item.image[0].asset._ref;
        const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
        console.log(item.price)
        console.log(item)
        let price = item.price
        if(item.isOnSale){
         price = item.price -(item.price/100*item.onSalePercent).toFixed()
        }
        console.log(price)
        return {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount:price * 100,
          },
          adjustable_quantity: {
            enabled:true,
            minimum: 1,
          },
          quantity: quanity[index-1]
        }
        
      })

      console.log(mapp)
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1OHrqfIT98uLjxAtuKmtKxPu' },
          { shipping_rate: 'shr_1OHrrEIT98uLjxAtEJjuWW9a' },
        ],
        discounts: [
          {coupon: 'cE5U8dgb'}
        ],
        line_items: mapp,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      console.log(err)
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}