import { CreateBlocState } from "@/app/blocs/create-bloc/page";
import useLightHouse from "@/lib/hooks/lighthouse";
import {
  Avatar,
  Button,
  Card,
  CrossSVG,
  Field,
  FieldSet,
  FileInput,
  Typography,
  VisuallyHidden,
} from "@ensdomains/thorin";
import Image from "next/image";
import { useEffect } from "react";

interface CreateBlocAssetsProps {
  coverImageFile: {
    localUrl: string;
    ipfsCid: string;
  };
  avatarFile: {
    localUrl: string;
    ipfsCid: string;
  };
  updateValues: (update: Partial<CreateBlocState>) => void;
}

const CreateBlocAssets = ({
  coverImageFile,
  avatarFile,
  updateValues,
}: CreateBlocAssetsProps) => {
  const { uploadFile, uploadStatuses } = useLightHouse();

  useEffect(() => {
    if (uploadStatuses["coverImageFile"]) {
      updateValues({
        coverImageFile: {
          ...coverImageFile,
          ipfsCid: uploadStatuses["coverImageFile"].fileStatus?.data.Hash || "",
        },
      });
    }
    if (uploadStatuses["avatarFile"]) {
      updateValues({
        avatarFile: {
          ...avatarFile,
          ipfsCid: uploadStatuses["avatarFile"].fileStatus?.data.Hash || "",
        },
      });
    }
  }, [uploadStatuses]);

  const handleFileChange =
    (type: keyof CreateBlocState) => async (file: File) => {
      const url = URL.createObjectURL(file);
      updateValues({ [type]: { localUrl: url, ipfsCid: "" } });
      // Create a synthetic event object
      const event = {
        target: {
          files: [file],
        },
        persist: () => {},
      };
      await uploadFile(event, type);
    };

  const handleFileReset = (type: keyof CreateBlocState) => () => {
    updateValues({ [type]: { localUrl: "", ipfsCid: "" } });
  };

  return (
    <Card className="w-full">
      <FieldSet
        legend="Visual Assets"
        description="Upload distinctive visuals that represent your bloc."
      >
        <Card>
          <Field description="" label="Asset Preview">
            <div className="flex w-full flex-col items-center">
              <div className="relative z-[1] grid h-36 w-full min-w-[9rem] place-items-center overflow-hidden  rounded-[20px] bg-[#3b3a3a]">
                <Image
                  src={
                    coverImageFile.localUrl ||
                    "https://avatar.vercel.sh/kelvinpraisoes@gmail.com"
                  }
                  style={{ objectFit: "cover", zIndex: 0 }}
                  fill
                  priority
                  alt={""}
                />
              </div>
              <div className="relative z-[1] mt-[-4rem] grid h-32 w-full max-w-[8rem] rounded-[50%] border-2 border-[#EFF1F8]">
                <Avatar src={avatarFile.localUrl} label="preview avatar" />
              </div>
            </div>
          </Field>
        </Card>
        <FileInput
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange("coverImageFile")}
          onReset={handleFileReset("coverImageFile")}
        >
          {(context) =>
            context.name ? (
              <div className="flex items-center gap-2">
                {context.name}
                <div className="flex items-center gap-2">
                  <Button
                    shape="circle"
                    size="small"
                    // @ts-ignore
                    onClick={context.reset}
                  >
                    <VisuallyHidden>Remove</VisuallyHidden>
                    <CrossSVG />
                  </Button>
                  <Typography fontVariant="smallBold">
                    {uploadStatuses["coverImageFile"]?.percentage}
                  </Typography>
                </div>
              </div>
            ) : (
              <div>{context.droppable ? "Drop cover" : "Attach cover"}</div>
            )
          }
        </FileInput>
        <FileInput
          accept="image/jpeg,image/png"
          onChange={handleFileChange("avatarFile")}
          onReset={handleFileReset("avatarFile")}
        >
          {(context) =>
            context.name ? (
              <div className="flex items-center gap-2">
                {context.name}
                <div className="flex items-center gap-2">
                  <Button
                    shape="circle"
                    size="small"
                    // @ts-ignore
                    onClick={context.reset}
                  >
                    <VisuallyHidden>Remove</VisuallyHidden>
                    <CrossSVG />
                  </Button>
                  <Typography fontVariant="smallBold">
                    {uploadStatuses["avatarFile"]?.percentage}
                  </Typography>
                </div>
              </div>
            ) : (
              <div>{context.droppable ? "Drop avatar" : "Attach avatar"}</div>
            )
          }
        </FileInput>
      </FieldSet>
    </Card>
  );
};

export default CreateBlocAssets;
