"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Sidebar from "@/components/Sidebar";

const Mobilesidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default Mobilesidebar;
