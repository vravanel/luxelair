import { ObjectType, Field, InputType, Arg, Mutation, Query, Resolver } from "type-graphql";
import Payment, { PaymentStatusEnum } from "../entities/payment";
import User from "../entities/user";
import Booking from "../entities/booking";
import { stripe } from "../stripe";

@ObjectType()
class PaymentStatusResult {
  @Field(() => PaymentStatusEnum)
  status!: PaymentStatusEnum;

  @Field(() => Booking, { nullable: true })
  booking?: Booking;
}

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

  @Mutation(() => String)
  async createStripeCheckoutSession(
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("bookingId") bookingId: string,
    @Arg("userId") userId: string
  ): Promise<string> {
    const user = await User.findOne({ where: { id: userId } });
    const booking = await Booking.findOne({ where: { id: bookingId } });
    if (!user || !booking) {
      throw new Error("User or Booking not found");
    }
    const amountInCents = amount * 100;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            unit_amount: amountInCents,
            currency: 'eur',
            product: "prod_QAeATtmABPgraI"
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        bookingId,
        userId,
      },
    });
    const payment = Payment.create({
      amount,
      currency,
      status: PaymentStatusEnum.Pending,
      booking,
      user,
    });

    await payment.save();
    return session.id;
  }

  @Mutation(() => PaymentStatusResult)
  async handlePaymentIntentSucceededWebhook(
    @Arg("bookingId") bookingId: string
  ): Promise<PaymentStatusResult> {
    try {
      // Find the payment associated with the booking
      const payment = await Payment.getPaymentByBookingId(bookingId);
      if (!payment) {
        console.error("Payment not found for booking ID:", bookingId);
        return { status: PaymentStatusEnum.Pending };
      }

      // Update payment status to Confirmed
      payment.status = PaymentStatusEnum.Confirmed;
      await payment.save();

      console.log(`Payment status updated to Confirmed for booking ID: ${bookingId}`);
      return { status: payment.status, booking: payment.booking };
    } catch (error) {
      console.error("Failed to handle payment_intent.succeeded webhook:", error);
      return { status: PaymentStatusEnum.Failed };
    }
  }
}