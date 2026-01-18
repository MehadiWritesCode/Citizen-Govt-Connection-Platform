"use client";

import { createContext } from "react";

export type chatMsg = {role:"user" | "assistant",content:string;}

type context = {
  lang:"bn" | "en",
  messages:chatMsg[],
  isLoading:boolean,
}

const ChatContext = createContext<context | null >(null);


