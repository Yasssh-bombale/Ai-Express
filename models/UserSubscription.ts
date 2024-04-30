import mongoose, { Schema, Document } from "mongoose";

export interface UserSubscriptionObject extends Document {
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: Date;
}

const SubscriptionSchema: Schema<UserSubscriptionObject> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    stripePriceId: {
      type: String,
    },
    stripeCurrentPeriodEnd: {
      type: Date,
    },
  },
  { timestamps: true }
);

const UserSubscriptionModel =
  mongoose.models.UserSubscriptionModel ||
  mongoose.model("UserSubscriptionModel", SubscriptionSchema);

export default UserSubscriptionModel;
