import { auth } from "@clerk/nextjs";
import { MAX_FREE_COUNTS } from "@/constant";
import UserApiLimit from "@/models/User";
import dbConnection from "./dbConnection";

export const increaseApiCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await UserApiLimit.findOne({
    userId,
  });

  if (userApiLimit) {
    userApiLimit.counter += 1;

    await userApiLimit.save();
  } else {
    await UserApiLimit.create({
      userId,
      counter: 1,
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await UserApiLimit.findOne({
    userId,
  });

  if (!userApiLimit || userApiLimit.counter < MAX_FREE_COUNTS) {
    // if user is on first trial or user uses less than MAX_FREE_COUNTS then allow user for using our API;
    return true;
  } else {
    // if user is on MAX_FREE_COUNTS then blocking user from using our API;
    return false;
  }
};

export const getApiLimitCount = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      return 0;
    }
    await dbConnection();

    const userApiLimit = await UserApiLimit.findOne({
      userId,
    });

    if (!userApiLimit) {
      return 0;
    }

    return userApiLimit.counter;
  } catch (error) {
    console.log(`ERROR:IN GETAPILIMITCOUNT ROUTE ${error}`);
  }
};
