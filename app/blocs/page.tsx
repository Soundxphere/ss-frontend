"use client";
import BlocsCover from "@/components/atoms/BlocsCover";
import { blocABI } from "@/lib/contracts/data";
import { gql, request } from "graphql-request";
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

interface QueryData {
  newMusicBlocs: MusicBloc[];
}

export default function BlocExplorerPage() {
  const { data, isLoading, error } = useQuery<QueryData, Error>(
    "launches",
    async (): Promise<QueryData> => {
      const response = await request(endpoint, FILMS_QUERY);
      return response as QueryData;
    },
  );

  useContractReads({
    contracts:
      data?.newMusicBlocs.map(({ bloc }) => {
        return {
          abi: blocABI,
          address: "0x59c2ada2aadf5d27da4c23acc4f41447c73ce63a",
          function: "getBlocMetadata",
          chainId: sepolia.id,
        };
      }),
    // watch: true,
    // enabled: !!data,
    onSuccess: (datas) => {
      console.log(data);
      console.log(datas);
    },
  });

  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-12">
      <BlocsCover />

      <div>
        <h1>SpaceX Launches</h1>
        {isLoading && <p>Loading...</p>}
        {error && <pre>{error.message}</pre>}
        {data && (
          <ul>
            {data.newMusicBlocs.map((blocs: MusicBloc) => (
              <li key={blocs.bloc}>{blocs.bloc}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
