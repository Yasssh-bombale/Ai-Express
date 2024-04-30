import UserSubscriptionModel from "@/models/UserSubscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  try {
    const subscription = await UserSubscriptionModel.findOne({ userId });

    if (!subscription) {
      return false;
    }

    const isValid =
      subscription.stripePriceId &&
      subscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
    // subscription.stripeCurrentPeriodEnd?.getTime()!  this will give the stripe expiry time in milliseconds suppose that is 29 may then DAY_IN_MS will add next day after the 29may and Date.now() give current date in milliseconds

    // if current date is subscription end time is greater than current date then it is valid subscription ;

    return !!isValid;
  } catch (error) {
    console.log(`ERROR_IN_CHECKSUBSCRIPTION ${error}`);
    return new NextResponse("ERROR_IN_CHECK_SUBSCRIPTION", { status: 500 });
  }
};
