import lighthouse from "@lighthouse-web3/sdk";
import { useState } from "react";

interface FileStatus {
  data: {
    Name: string;
    Size: number;
    Hash: string;
  };
}

interface UploadStatus {
  percentage: number;
  fileStatus: FileStatus | null;
}

const useLightHouse = () => {
  const [uploadStatuses, setUploadStatuses] = useState<
    Record<string, UploadStatus>
  >({});

  const uploadFile = async (e: any, key: string) => {
    const progressCallback = (progressData: {
      total: number;
      uploaded: number;
    }) => {
      let percentageDone = parseFloat(
        ((progressData?.uploaded / progressData?.total) * 99).toFixed(2),
      );

      setUploadStatuses((prevStatuses) => ({
        ...prevStatuses,
        [key]: {
          percentage: percentageDone,
          fileStatus: null,
        },
      }));
    };

    const output = (await lighthouse.upload(
      e,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || "",
      progressCallback,
    )) as FileStatus;

    setUploadStatuses((prevStatuses) => ({
      ...prevStatuses,
      [key]: {
        // We only make it a 100% when we've got a fileStatus cid
        percentage: 100,
        fileStatus: output,
      },
    }));

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash,
    );
  };

  return { uploadFile, uploadStatuses };
};

export default useLightHouse;
