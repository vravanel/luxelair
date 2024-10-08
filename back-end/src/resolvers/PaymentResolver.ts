import {
  Field,
  InputType,
  Arg,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import Payment, { PaymentStatusEnum } from "../entities/payment";
import User from "../entities/user";
import Booking from "../entities/booking";
import { stripe } from "../stripe";


export
@InputType()
class EditOrCreatePayment {
  @Field()
  amount!: number;

  @Field()
  currency!: string;

  @Field()
  description!: string;

  @Field()
  createdAt!: Date;

  @Field(() => PaymentStatusEnum, { nullable: true })
  status!: PaymentStatusEnum;

  @Field()
  user_id!: string;

  @Field()
  booking_id!: string;

  @Field({ nullable: true })
  stripeCheckoutSessionId!: string;
}

@Resolver()
export class PaymentResolver {
  @Query(() => Payment)
  async getPaymentByBookingById(@Arg("id") id: string): Promise<Payment> {
    return await Payment.getPaymentByBookingId(id);
  }

  @Query(() => Payment)
  async getPaymentById(@Arg("id") id: string): Promise<Payment> {
    return await Payment.getPaymentById(id);
  }

  //this function creates a cehckout session (the payment page) thanks to "stripe.checkout.sessions.create"
  //this function sends to stripe the necessary to pay like the unit amount, the total price
  @Mutation(() => String)
  async createStripeCheckoutSession(
    //the arguments we send to stripe
    @Arg('amount') amount: number,
    @Arg('currency') currency: string,
    @Arg('bookingId') bookingId: string,
    @Arg('userId') userId: string
  ): Promise<string> {
    const user = await User.findOne({ where: { id: userId } });
    const booking = await Booking.findOne({ where: { id: bookingId } });
    if (!user || !booking) {
      throw new Error('User or Booking not found');
    }

    const amountInCents = amount * 100;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            unit_amount: amountInCents,
            currency,
            product: 'prod_QAeATtmABPgraI', 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      //we'll be redirected to one of these urls after the checkout session
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        bookingId,
        userId,
      },
    });
//we save the payment in our db
//we save stripeCheckoutSessionId which we will use later to get the successful bookings
    const payment = new Payment();
    payment.amount = amount;
    payment.currency = currency;
    payment.status = PaymentStatusEnum.Pending;
    payment.stripeCheckoutSessionId = session.id;
    payment.user = user;
    payment.booking = booking;
    await payment.save();

    return session.id;
  }

}
