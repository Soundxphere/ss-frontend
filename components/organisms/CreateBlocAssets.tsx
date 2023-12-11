import {
  Avatar,
  Button,
  Card,
  CrossSVG,
  Field,
  FieldSet,
  FileInput,
  VisuallyHidden,
} from "@ensdomains/thorin";
import Image from "next/image";

interface CreateBlocAssetsProps {
  coverImageFile: string;
  avatarFile: string;
  setCoverImageFile: (value: string) => void;
  setAvatarFile: (value: string) => void;
}

const CreateBlocAssets = ({
  coverImageFile,
  avatarFile,
  setCoverImageFile,
  setAvatarFile,
}: CreateBlocAssetsProps) => {
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
                    coverImageFile ||
                    "https://avatar.vercel.sh/kelvinpraisoes@gmail.com"
                  }
                  style={{ objectFit: "cover", zIndex: 0 }}
                  fill
                  priority
                  alt={""}
                />
              </div>
              <div className="relative z-[1] mt-[-4rem] grid h-32 w-full max-w-[8rem] rounded-[50%] border-2 border-[#EFF1F8]">
                <Avatar src={avatarFile} label="preview avatar" />
              </div>
            </div>
          </Field>
        </Card>
        <FileInput
          accept="image/jpeg,image/png"
          onChange={async (file) => {
            const url = URL.createObjectURL(file);
            setCoverImageFile(url);
          }}
          onReset={() => setCoverImageFile("")}
        >
          {(context) =>
            context.name ? (
              <div className="flex items-center gap-2">
                {context.name}
                <div style={{ width: "48px" }}>
                  <Button
                    shape="circle"
                    size="small"
                    // @ts-ignore
                    onClick={context.reset}
                  >
                    <VisuallyHidden>Remove</VisuallyHidden>
                    <CrossSVG />
                  </Button>
                </div>
              </div>
            ) : (
              <div>{context.droppable ? "Drop cover" : "Attach cover"}</div>
            )
          }
        </FileInput>
        <FileInput
          accept="image/jpeg,image/png"
          onChange={async (file) => {
            const url = URL.createObjectURL(file);
            setAvatarFile(url);
          }}
          onReset={() => setAvatarFile("")}
        >
          {(context) =>
            context.name ? (
              <div className="flex items-center gap-2">
                {context.name}
                <div style={{ width: "48px" }}>
                  <Button
                    shape="circle"
                    size="small"
                    // @ts-ignore
                    onClick={context.reset}
                  >
                    <VisuallyHidden>Remove</VisuallyHidden>
                    <CrossSVG />
                  </Button>
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
