import { Card, FieldSet, Input, Select, Textarea } from "@ensdomains/thorin";

const CreateBlocInfo = () => {
  return (
    <Card className="w-full">
      <FieldSet
        legend="Bloc Info"
        description="Capture your bloc's essence with key details."
      >
        <Input label="Name" placeholder="Bloc Name" />
        <Textarea
          label="Description"
          placeholder="Describe what the bloc is about"
        />
        <Input label="Genre" placeholder="What is your music genre" />
        <Select
          description="Chain to mint released NFT music"
          label="Chain"
          options={[
            { value: "avalanche", label: "Avalanche" },
            { value: "ethereum", label: "Ethereum" },
            { value: "bsc", label: "Binance Smart Chain" },
            { value: "solana", label: "Solana" },
          ]}
          placeholder="Select a chain"
        />
      </FieldSet>
    </Card>
  );
};

export default CreateBlocInfo;
