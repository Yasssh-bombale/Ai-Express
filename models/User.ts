import mongoose, { Schema, Document } from "mongoose";

export interface UserApiLimitObject extends Document {
  userId: string;
  counter: number;
}

const ApiLimitSchema: Schema<UserApiLimitObject> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserApiLimit =
  (mongoose.models.UserApiLimit as mongoose.Model<UserApiLimitObject>) ||
  mongoose.model<UserApiLimitObject>("UserApiLimit", ApiLimitSchema);

export default UserApiLimit;
