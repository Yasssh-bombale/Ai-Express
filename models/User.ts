import mongoose, { Schema, Document } from "mongoose";

// export interface User extends Document {
//   username: string;
//   email: string;
//   createdAt:Date;
// }

// const userSchema: Schema<User> = new Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "Username is required"],
//       trim: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: [true, "email is required"],
//       unique: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const UserModel =
//   (mongoose.models.User as mongoose.Model<User>) ||
//   mongoose.model<User>("User", userSchema);

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
