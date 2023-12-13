import { CreateBlocState } from "@/app/blocs/create-bloc/page";
import { sanitizeSubdomain } from "@/lib/utils";
import { Card, FieldSet, Input, Select, Textarea } from "@ensdomains/thorin";
import React from "react";

interface CreateBlocInfoProps {
  updateValues: (update: Partial<CreateBlocState>) => void;
  values: CreateBlocState;
}

const CreateBlocInfo = ({ updateValues, values }: CreateBlocInfoProps) => {
  const handleInputChange =
    (type: keyof CreateBlocState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateValues({ [type]: e.target.value });
    };

  return (
    <Card className="w-full">
      <FieldSet
        legend="Bloc Info"
        description="Capture your bloc's essence with key details."
      >
        <Input
          label="Name"
          placeholder="Bloc Name"
          value={values.name}
          description={(
            sanitizeSubdomain(values.name) + ".soundsphere.test"
          ).toLowerCase()}
          onChange={handleInputChange("name")}
        />
        <Textarea
          label="Description"
          placeholder="Describe what the bloc is about"
          value={values.description}
          onChange={handleInputChange("description")}
        />
        <Input
          label="Genre"
          placeholder="What is your music genre"
          value={values.genre}
          onChange={handleInputChange("genre")}
        />
        <Select
          description="Chain to mint released NFT music"
          label="Chain"
          options={[
            { value: "avalanche", label: "Avalanche" },
            { value: "ethereum", label: "Ethereum" },
            { value: "bsc", label: "Binance Smart Chain" },
            { value: "solana", label: "Solana" },
          ]}
          value={values.mintChain}
          onChange={(e) => updateValues({ mintChain: e.target.value })}
        />
      </FieldSet>
    </Card>
  );
};

export default CreateBlocInfo;
