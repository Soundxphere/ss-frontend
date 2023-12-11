import { BrowserProvider } from "ethers";
import { SiweMessage } from "siwe";

const domain = typeof window !== "undefined" ? window.location.host : undefined;
const origin =
  typeof window !== "undefined" ? window.location.origin : undefined;
const provider =
  typeof window !== "undefined"
    ? new BrowserProvider((window as any).ethereum)
    : undefined;

export function connectWallet(
  callback: ({
    name,
    address,
  }: {
    name: string;
    address: string;
    avatarUrl: string;
  }) => void
) {
  provider
    ?.send("eth_requestAccounts", [])
    .catch(() => console.log("user rejected request"));
}

async function createSiweMessage(address: string, statement: string) {
  const res = await fetch(`${BACKEND_ADDR}/nonce`, {
    credentials: "include",
  });
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
    nonce: await res.text(),
  });
  return message.prepareMessage();
}

export async function signInWithEthereum() {
  const signer = await provider?.getSigner();

  if (!signer) {
    return;
  }
  const message = await createSiweMessage(
    await signer.getAddress(),
    "Sign in with Ethereum to the app."
  );
  const signature = await signer.signMessage(message);

  const res = await fetch(`${BACKEND_ADDR}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, signature }),
    credentials: "include",
  });
  return res;
}
