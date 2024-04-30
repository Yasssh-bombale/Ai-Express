"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import TypeWriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold text-center py-36 space-y-5 ">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent text-4xl md:text-6xl  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypeWriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Code Generation.",
                "Music Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="text-sm md:text-xl font-light text-zinc-400 ">
        Create content using AI 10x faster
      </div>

      <div>
        <Link href={isSignedIn ? "/dashboard" : "sign-up"}>
          <Button
            variant={"premium"}
            className="md:text-lg font-semibold rounded-full p-4 md:p-6"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
    </div>
  );
};
