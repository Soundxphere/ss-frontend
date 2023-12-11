"use client";
import { ThorinGlobalStyles, lightTheme } from "@ensdomains/thorin";
import React from "react";
import { ThemeProvider } from "styled-components";

import MainNav from "../organisms/MainNav";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import RootProvider from "@/lib/providers/provider";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootProvider>
      <StyledComponentsRegistry>
        <ThemeProvider theme={lightTheme}>
          <div className="flex w-full flex-col items-center gap-12">
            {/* <ThorinGlobalStyles /> */}
            <MainNav />
            {children}
          </div>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </RootProvider>
  );
};

export default LayoutWrapper;
