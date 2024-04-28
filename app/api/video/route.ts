import { checkApiLimit, increaseApiCount } from "@/lib/api-limit";
import dbConnection from "@/lib/dbConnection";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    await dbConnection();

    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("Your free trial has expired", { status: 403 });
    }
    const input = {
      fps: 24,
      width: 1024,
      height: 576,
      prompt,
      guidance_scale: 17.5,
      negative_prompt:
        "very blue, dust, noisy, washed out, ugly, distorted, broken",
    };

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      { input }
    );
    await increaseApiCount();
    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
