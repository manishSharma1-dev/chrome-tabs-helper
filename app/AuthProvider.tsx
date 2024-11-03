"use client";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

export const AuthProvider = ({children}:{ children : any }) => {
  return <KindeProvider>{children}</KindeProvider>;
};