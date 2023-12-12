"use client";
import { Button, Card, Typography } from "@ensdomains/thorin";
import { useReducer, useState } from "react";
import { stringToHex } from "viem";
import { useContractWrite, useNetwork, usePrepareContractWrite } from "wagmi";

import FeedCover from "@/components/atoms/FeedCover";
import CreateBlocAssets from "@/components/organisms/CreateBlocAssets";
import CreateBlocInfo from "@/components/organisms/CreateBlocInfo";
import CreateBlocSeed from "@/components/organisms/CreateBlocSeed";
import { coreABI, routerABI } from "@/lib/contracts/data";
import { satisfies } from "@/lib/utils";

interface ContractArgs {
  blockInfoCid: string;
  subdomain: string;
  seedInfoCid: string;
}

export interface CreateBlocState {
  name: string;
  description: string;
  genre: string;
  chain: string;
  coverImageFile: {
    localUrl: string;
    uploadedUrl: string;
  };
  avatarFile: {
    localUrl: string;
    uploadedUrl: string;
  };
  main: {
    localUrl: string;
    uploadedUrl: string;
  };
  stems: Array<{
    localUrl: string;
    uploadedUrl: string;
  }>;
}

const initialState: CreateBlocState = {
  name: "",
  description: "",
  genre: "",
  chain: "",
  coverImageFile: {
    localUrl: "",
    uploadedUrl: "",
  },
  avatarFile: {
    localUrl: "",
    uploadedUrl: "",
  },
  main: {
    localUrl: "",
    uploadedUrl: "",
  },
  stems: [
    {
      localUrl: "",
      uploadedUrl: "",
    },
  ],
};

const reducer = (
  state: CreateBlocState,
  update: Partial<CreateBlocState>,
): CreateBlocState => {
  return { ...state, ...update };
};

const useBlocContractWrite = (abi: any, address: any, args: ContractArgs) => {
  const { config } = usePrepareContractWrite({
    address: stringToHex(address || ""),
    abi: abi,
    functionName: "createMusicBloc",
    args: [args.blockInfoCid, args.subdomain, args.seedInfoCid],
    enabled: satisfies([args.blockInfoCid, args.subdomain, args.seedInfoCid]),
  });

  return useContractWrite(config);
};

export default function CreateBlocPage() {
  const { chain } = useNetwork();

  const [state, updateValues] = useReducer(reducer, initialState);
  const [contractArgs, setContractArgs] = useState<ContractArgs>({
    blockInfoCid: "",
    subdomain: "",
    seedInfoCid: "",
  });

  const {
    data: dataCore,
    isLoading: isLoadingCore,
    isSuccess: isSuccessCore,
    write: writeCore,
  } = useBlocContractWrite(
    coreABI,
    process.env.NEXT_PUBLIC_CORE_CONTRACT,
    contractArgs,
  );

  const {
    data: dataRouter,
    isLoading: isLoadingRouter,
    isSuccess: isSuccessRouter,
    write: writeRouter,
  } = useBlocContractWrite(
    routerABI,
    process.env.NEXT_PUBLIC_ROUTER_CONTRACT,
    contractArgs,
  );

  const sepoliaId = 11155111;

  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-12">
      <FeedCover />
      <div className="flex w-full gap-12">
        <div className="flex w-full flex-col gap-12">
          <div className="flex w-full flex-col gap-8">
            <CreateBlocInfo updateValues={updateValues} values={state} />
            <CreateBlocAssets
              coverImageFile={state.coverImageFile}
              avatarFile={state.avatarFile}
              updateValues={updateValues}
            />
            <CreateBlocSeed
              main={state.main}
              stems={state.stems}
              updateValues={updateValues}
            />
          </div>

          {chain?.id === sepoliaId ? (
            <Button
              className="!bg-[#4E81FF]"
              loading={isLoadingCore}
              disabled={!writeCore}
              onClick={() => writeCore?.()}
            >
              Submit
            </Button>
          ) : (
            <Button
              className="!bg-[#4E81FF]"
              loading={isLoadingRouter}
              disabled={!writeRouter}
              onClick={() => writeRouter?.()}
            >
              Submit
            </Button>
          )}
        </div>

        <Card className="h-max w-full !max-w-sm">
          <Typography fontVariant="extraLargeBold" className="!font-outfit">
            Tip
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography>
            We know it's painful right now, so go light on the stem tracks 🥲
          </Typography>
        </Card>
      </div>
    </div>
  );
}
