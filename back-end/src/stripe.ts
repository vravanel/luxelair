// import Stripe from "stripe";
// import express, { Request, Response } from "express";
// import bodyParser from "body-parser";
// import Payment, { PaymentStatusEnum } from "./entities/payment"; // Adjust the path as necessary

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-04-10",
// });

// const webhookHandler = express.Router();

// // Use the raw body to handle Stripe webhooks
// webhookHandler.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   async (req: Request, res: Response) => {
//     const sig = req.headers["stripe-signature"];
//     if (!sig) {
//       console.error("Missing stripe-signature header");
//       return res.status(400).send("Webhook Error: Missing stripe-signature header");
//     }

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET!
//       );
//     } catch (err) {
//       console.error("Webhook signature verification failed:",);
//       return res.status(400).send(`Webhook Error: `);
//     }

//     // Handle the event
//     switch (event.type) {
//       case "payment_intent.succeeded":
//         // Handle payment success
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         const metadata = paymentIntent.metadata;
//         if (metadata && metadata.bookingId) {
//           const bookingId = metadata.bookingId;
//           // Update payment status here
//           const statusUpdated = await this.paymentResolver.handlePaymentIntentSucceededWebhook(bookingId);
         
//           console.log(`Payment status updated: ${statusUpdated}`);}
        
//         break;
//       // Handle other event types as needed
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
    

//     res.status(200).json({ received: true });
//   }
// );

// export { stripe, webhookHandler };

import Stripe from "stripe";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import {PaymentResolver} from "./resolvers/PaymentResolver"; 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const webhookHandler = express.Router();

// Use the raw body to handle Stripe webhooks
webhookHandler.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      console.error("Missing stripe-signature header");
      return res.status(400).send("Webhook Error: Missing stripe-signature header");
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(400).send(`Webhook Error}`);
    }

    // Create an instance of the PaymentResolver
    const paymentResolver = new PaymentResolver();

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle payment success
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata;
        if (metadata && metadata.bookingId) {
          const bookingId = metadata.bookingId;
          // Update payment status here
          const statusUpdated = await paymentResolver.handlePaymentIntentSucceededWebhook(bookingId);
          
          console.log(`Payment status updated: ${statusUpdated}`);
        }
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    res.status(200).json({ received: true });
  }
);

export { stripe, webhookHandler };