"use client"

import { ClerkProvider } from "@clerk/nextjs"
import React from "react"

export default function ClerkProviderWrapper({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
