import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  text: string;
};

const LoadingButton = ({ text }: Props) => {
  return (
    <Button variant={"premium"} className="w-full">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {text}
    </Button>
  );
};

export default LoadingButton;
