import { checkApiLimit, increaseApiCount } from "@/lib/api-limit";
import dbConnection from "@/lib/dbConnection";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_PARIK_APIKEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key is not configured", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // await prismaDb.$connect();
    // check is free trial or not;
    await dbConnection();
    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    await increaseApiCount(); //increasing API Count;

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    // await prismaDb.$disconnect();
    return new NextResponse("Internal Error", { status: 500 });
  }
}
