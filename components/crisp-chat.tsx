"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c49abb27-67da-40d2-a84c-3f1096808ec8");
  }, []);

  return null;
};
