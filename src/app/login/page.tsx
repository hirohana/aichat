"use client";

import { signIn } from "next-auth/react";

import LoginButton from "@/components/atoms/LoginButton";

export default function Login() {
  return (
    <div>
      <div>Login Page</div>
      <LoginButton onClick={signIn}>Login With Google</LoginButton>
    </div>
  );
}
