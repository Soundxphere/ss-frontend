"use client";
import Circle from "@/components/atoms/Concentric";
import { Button, Card, EthTransparentSVG, Heading, Input, Select } from "@ensdomains/thorin";

export default function DispenserPage() {
  const sizes = Array.from({ length: 12 }, (_, i) => 150 + i * 100);

  return (
    <div className="relative flex w-full flex-col items-center gap-12 ">
      {sizes.map((size, index) => (
        <Circle key={index} size={size} opacity={1 - index * 0.08} />
      ))}
      <Heading align="center">SST Token Dispenser</Heading>

      <Card className="w-full max-w-screen-sm">
        <Select
          description="SST is a cross chain enabled token"
          label="Chain"
          options={[
            { value: "avalanche", label: "Avalanche" },
            { value: "ethereum", label: "Ethereum" },
            { value: "bsc", label: "Binance Smart Chain" },
            { value: "solana", label: "Solana" },
          ]}
          placeholder="Select a chain..."
        />
        <Input
          label="Wallet Address"
          placeholder="Input Your Wallet Address"
          prefix={<EthTransparentSVG />}
        />
        <Button
          className="!bg-[#4E81FF]"
          disabled={false}
          loading={true}
          onClick={() => {}}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
}
