"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "@/hooks/user-pro-model";
import { Badge } from "./ui/badge";
import {
  Check,
  CircleCheckBig,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-yellow-700",
    bgColor: "bg-yellow-700/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

const ProModal = () => {
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center  pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to AI Express
              <Badge className="uppercase text-sm py-1" variant={"premium"}>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-zinc-900 pt-2 font-medium space-y-2">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="border-black/5 p-3 flex items-center justify-between"
              >
                {/* icon and label of tool */}
                <div className="flex items-center gap-x-4 ">
                  <div className={cn("p-2 w-fit", tool.bgColor)}>
                    <tool.icon className={cn("h-6 w-6", tool.color)} />
                  </div>
                  <div className="font-semibold ">{tool.label}</div>
                </div>

                <CircleCheckBig className="text-green-600" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size={"lg"} variant={"premium"} className="w-full">
            Upgrade
            <Zap className="w-4 h-4 fill-white ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
