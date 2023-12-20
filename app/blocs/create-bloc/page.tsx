"use client";
import { Button, Card, Toast, Typography } from "@ensdomains/thorin";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  Address,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { sepolia } from "wagmi/chains";

import CreateBlocCover from "@/components/atoms/CreateBlocCover";
import CreateBlocAssets from "@/components/organisms/CreateBlocAssets";
import CreateBlocInfo from "@/components/organisms/CreateBlocInfo";
import CreateBlocSeed from "@/components/organisms/CreateBlocSeed";
import { coreABI, routerABI } from "@/lib/contracts/data";
import useLightHouse from "@/lib/hooks/lighthouse";
import { isEmpty, sanitizeSubdomain, satisfies } from "@/lib/utils";

interface ContractArgs {
  blockInfoCid: string;
  subdomain: string;
  seedInfoCid: string;
}

export interface CreateBlocState {
  name: string;
  description: string;
  genre: string;
  mintChain: string;
  coverImageFile: {
    localUrl: string;
    ipfsCid: string;
  };
  avatarFile: {
    localUrl: string;
    ipfsCid: string;
  };
  main: {
    localUrl: string;
    ipfsCid: string;
  };
  stems: Array<{
    localUrl: string;
    ipfsCid: string;
  }>;
}

const initialState: CreateBlocState = {
  name: "",
  description: "",
  genre: "",
  mintChain: "",
  coverImageFile: {
    localUrl: "",
    ipfsCid: "",
  },
  avatarFile: {
    localUrl: "",
    ipfsCid: "",
  },
  main: {
    localUrl: "",
    ipfsCid: "",
  },
  stems: [
    {
      localUrl: "",
      ipfsCid: "",
    },
  ],
};

const reducer = (
  state: CreateBlocState,
  update: Partial<CreateBlocState>,
): CreateBlocState => {
  return { ...state, ...update };
};

const useBlocContractWrite = (
  abi: any,
  address: Address,
  functionName: string,
  args: ContractArgs,
) => {
  console.log(args);
  console.log(satisfies([args.blockInfoCid, args.subdomain, args.seedInfoCid]));

  const { config, error } = usePrepareContractWrite({
    address,
    abi,
    functionName,
    args: [args.blockInfoCid, args.subdomain, args.seedInfoCid],
    enabled: satisfies([args.blockInfoCid, args.subdomain, args.seedInfoCid]),
  });

  error && console.error(error);

  return useContractWrite(config);
};

export default function CreateBlocPage() {
  const { chain } = useNetwork();
  const { uploadFile, uploadStatuses } = useLightHouse();
  const writeFunctionRef = useRef<Function | null>(null);
  const [state, updateValues] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
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
    process.env.NEXT_PUBLIC_CORE_CONTRACT as Address,
    "createMusicBloc",
    contractArgs,
  );

  const {
    data: dataRouter,
    isLoading: isLoadingRouter,
    isSuccess: isSuccessRouter,
    write: writeRouter,
  } = useBlocContractWrite(
    routerABI,
    process.env.NEXT_PUBLIC_POLYGON_ROUTER_CONTRACT as Address,
    "sendCreateMusicBloc",
    contractArgs,
  );

  useEffect(() => {
    if (isSuccessCore || isSuccessRouter) {
      setIsToastOpen(true);
    }
  }, [isSuccessCore, isSuccessRouter]);

  useEffect(() => {
    if (isEmpty(uploadStatuses)) return;

    const allUploadsCompleted = Object.values(uploadStatuses).every(
      (status) => status.percentage === 100,
    );

    setIsLoading(!allUploadsCompleted);

    if (allUploadsCompleted) {
      setIsLoading(false);

      const blocInfoStatus = uploadStatuses["blocInfo"];
      const musicSeedStatus = uploadStatuses["musicSeed"];

      setContractArgs({
        blockInfoCid: blocInfoStatus?.fileStatus?.data?.Hash || "",
        subdomain: sanitizeSubdomain(state.name),
        seedInfoCid: musicSeedStatus?.fileStatus?.data?.Hash || "",
      });

      if (writeFunctionRef.current) {
        writeFunctionRef.current();
      }
    }
  }, [uploadStatuses]);

  async function handleOnClick(writeFunction: Function) {
    writeFunctionRef.current = writeFunction;

    const blocInfoJson = JSON.stringify({
      name: state.name,
      description: state.description,
      genre: state.genre,
      mintChain: state.mintChain,
      coverImage: {
        ipfsCid: state.coverImageFile.ipfsCid,
      },
      avatarFile: {
        ipfsCid: state.avatarFile.ipfsCid,
      },
    });

    const musicSeedJson = JSON.stringify({
      main: {
        ipfsCid: state.main.ipfsCid,
      },
      stems: state.stems.map((stem) => ({ ipfsCid: stem.ipfsCid })),
    });

    const event = [
      {
        target: {
          files: [blocInfoJson],
        },
        persist: () => {},
      },
      {
        target: {
          files: [musicSeedJson],
        },
        persist: () => {},
      },
    ];

    await Promise.all([
      uploadFile(event[0], "blocInfo"),
      uploadFile(event[1], "musicSeed"),
    ]);
  }

  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-12">
      <CreateBlocCover />
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

          {chain?.id === sepolia.id ? (
            <Button
              className="!bg-[#4E81FF]"
              loading={isLoading || isLoadingCore}
              disabled={!writeCore || isLoading}
              onClick={() => writeCore && handleOnClick(writeCore)}
            >
              Submit
            </Button>
          ) : (
            <Button
              className="!bg-[#4E81FF]"
              loading={isLoading || isLoadingRouter}
              disabled={!writeRouter || isLoading}
              onClick={() => writeRouter && handleOnClick(writeRouter)}
            >
              Submit
            </Button>
          )}
        </div>

        <Toast
          description={
            "Success! Your music bloc has been submitted. Time to stream your feelings to the world!"
          }
          open={isToastOpen}
          title="Transaction successful"
          variant="desktop"
          onClose={() => setIsToastOpen(false)}
        >
          <Button
            className="!bg-[#4E81FF]"
            size="small"
            as="a"
            href={
              chain?.blockExplorers?.default
                ? chain.blockExplorers.default.url +
                  "/tx/" +
                  (dataCore?.hash || dataRouter?.hash || "")
                : ""
            }
            rel="noreferrer"
            target="_blank"
          >
            View In Explorer
          </Button>
        </Toast>

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
