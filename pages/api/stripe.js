import Stripe from 'stripe';
import { client, urlFor } from '../../lib/client';
import purchase from './models/purchases.js'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { dbConnect } from "./dbConnection.js";
import {webhookListen} from './webhook.js'
export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    try {
      const con = await dbConnect();
      const app = await webhookListen();
      let ids =[]
      let quanity =[]
      
      let itemAll = {}
      
      req.body.map((item) => {
        console.log("Ids " + item._id)
        console.log("quanity " + item.quantity)
        itemAll[item._id] = item.quantity
        ids.push(item._id)
        quanity.push(item.quantity)
      })
      let ind = 0;
     /* ids.forEach((id) =>{
        console.log(id)
        client.patch(id).dec({quantity: quanity[ind]}).commit()
        ind++
      })*/
      const query = `*[_id in '${ids}')]`;
      const products = await client.fetch(
          '*[_id in $ids]',
          {ids: ids}
      )

      console.log("aaa" + ids)
      console.log("qqqqq" + itemAll)
     
      let index = 0;
      var itemNotAvaliable = false;
      
      var notAval = []
      let mapp = products.map((item) => {
        index++
        var amountTORemove = 0
        var quantityToUse = itemAll[item._id]
        
        if (item.quantity > 0){
          if (itemAll[item._id] > item.quantity){
            console.log("MORE IN BASKET")
            amountTORemove = itemAll[item._id] - item.quantity
            quantityToUse = quantityToUse - amountTORemove
            itemNotAvaliable = true
          }
          
          console.log("quantityToUse for id " + item._id)
          console.log(quantityToUse)
          for (let i = 0; i < amountTORemove; i++) {
            notAval.push(item._id)
          }
        const img = item.image[0].asset._ref;
        const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
        let price = item.price
        if(item.isOnSale){
         price = item.price -(item.price/100*item.onSalePercent)
        }

          console.log(price)
          console.log(price.toFixed(2))
        return {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount:price.toFixed(2)*100,
          },
          adjustable_quantity: {
            enabled:true,
            minimum: 1,
          },
          quantity: quantityToUse,
          payment_intent_data: {
            
          }
        }
        
      }else{
        itemNotAvaliable = true
          notAval.push(item._id)
      }
      })
      if(!mapp || itemNotAvaliable){
        console.log("inside")
        console.log(itemNotAvaliable)
        res.status(401).json(notAval)
        return
      }
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
      
      let itemsToStore = []
      req.body.map((item) => {
        let price = item.price
        if(item.isOnSale){
          price = item.price -(item.price/100*item.onSalePercent).toFixed()
        }
        itemsToStore.push({
          itemId: item._id,
          quantity: item.quantity,
          unitPrice: price
        })
      })
      let daa = await purchase.findOneAndUpdate({"stripeId": session.id}, {items: itemsToStore}, {upsert: true, new: true})
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