"use client";
import BlocsCover from "@/components/atoms/BlocsCover";
import { blocABI } from "@/lib/contracts/data";
import { Card } from "@ensdomains/thorin";
import { gql, request } from "graphql-request";
import { useState } from "react";
import { useQuery } from "react-query";
import { Address, useContractReads } from "wagmi";
import { sepolia } from "wagmi/chains";

const endpoint =
  "https://api.studio.thegraph.com/proxy/61092/soundxphere/0.0.2";
const FILMS_QUERY = gql`
  {
    newMusicBlocs {
      creator
      bloc
      id
    }
  }
`;

interface MusicBloc {
  creator: string;
  bloc: Address;
  id: string;
}

interface BlocData {
  result: [string, boolean, BigInt];
}

interface QueryData {
  newMusicBlocs: MusicBloc[];
}

export default function BlocExplorerPage() {
  const [blocInfo, setBlocInfo] = useState<any[]>();
  const { data, isLoading, error } = useQuery<QueryData, Error>(
    "launches",
    async (): Promise<QueryData> => {
      const response = await request(endpoint, FILMS_QUERY);
      return response as QueryData;
    },
  );
  useContractReads({
    contracts: data?.newMusicBlocs.map(({ bloc }) => {
      return {
        abi: blocABI,
        address: bloc,
        functionName: "getBlocMetadata",
        chainId: sepolia.id,
      };
    }),
    enabled: !!data,
    onSuccess: (data: BlocData[]) => {
      data.map((bloc: BlocData) => {
        const blocInfoCid = bloc.result[0];
        const released = bloc.result[1];
      });
    },
  });

  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-12">
      <BlocsCover />
      <div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <h1 className="col-span-full">Blocs Addresses</h1>
          {isLoading && <p className="col-span-full">Loading...</p>}
          {error && <pre className="col-span-full">{error.message}</pre>}
          {data && (
            <>
              {data.newMusicBlocs.map((blocs: MusicBloc) => (
                <Card key={blocs.bloc} className="">
                  {blocs.bloc}
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
