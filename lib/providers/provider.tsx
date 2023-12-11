"use client";
import React from "react";
import RainbowKitProvider from "./rainbowkit";
import WagmiProvider from "./wagmi";


const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <WagmiProvider>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </WagmiProvider>
    </div>
  );
};

export default RootProvider;
