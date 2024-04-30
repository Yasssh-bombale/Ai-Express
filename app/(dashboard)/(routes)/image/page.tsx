"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import { Download, Image as Img } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { formSchema } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Empty from "@/components/Empty";
import Loader from "@/components/Loader";

import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/user-pro-model";
import toast from "react-hot-toast";

const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]); //whenever form submits images state will set to empty array[];

      const response = await axios.post("/api/image", values);

      const url = response.data.map((image: { url: string }) => image.url);

      setImages(url);

      form.reset(); // it will clear input after submiting prompt
    } catch (error: any) {
      console.log(`Error in client image page ${error}`);
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Convert your prompt into an image."
        icon={Img}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                        placeholder="A picture of horse in swiss alps"
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
            <div className="p-20">
              <Loader />
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}
          <div className="flex items-center justify-center w-full  mt-8">
            {images.map((image) => (
              <Card key={image} className="rounded-lg overflow-hidden w-96">
                <div className="relative aspect-square">
                  <Image alt="image" src={image} fill />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(image)}
                    variant={"secondary"}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
