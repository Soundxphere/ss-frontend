import {
  RainbowKitProvider as _RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { avalancheFuji, polygonMumbai, sepolia } from "wagmi/chains";

const RainbowKitProvider = ({ children }: { children: React.ReactNode }) => {
  // NOTE: The chains is passed in by WagmiProvider
  return (
    <_RainbowKitProvider
      theme={lightTheme({
        accentColor: "#4E81FF",
        accentColorForeground: "white",
        borderRadius: "medium",
        fontStack: "system",
        overlayBlur: "large",
      })}
      coolMode
      chains={[sepolia, polygonMumbai, avalancheFuji]}
    >
      {children}
    </_RainbowKitProvider>
  );
};

export default RainbowKitProvider;
