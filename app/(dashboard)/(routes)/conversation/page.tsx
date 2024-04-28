"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { formSchema } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { useProModal } from "@/hooks/user-pro-model";

const Conversation = () => {
  const proModal = useProModal(); //upgrade pro modal hook
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset(); // it will clear input after submiting prompt
    } catch (error: any) {
      if (error?.response?.status === 403) {
        //opening Pro modal when encountered with 403 statusCode which will throw when user has exceeded their free tier
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Next Generation most advanced conversation model.."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6  focus-within:shadow-sm  grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do i calculate radius of a circle"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 flex items-center justify-center rounded-lg bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 flex items-start gap-x-8 rounded-lg",
                  msg.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {msg.role === "user" ? <UserAvatar /> : <BotAvatar />}
                {msg.content as string}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
