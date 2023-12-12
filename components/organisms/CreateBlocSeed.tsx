import { CreateBlocState } from "@/app/blocs/create-bloc/page";
import {
  Button,
  Card,
  CrossSVG,
  Field,
  FieldSet,
  FileInput,
  Typography,
  VisuallyHidden,
} from "@ensdomains/thorin";
import SeedPlayback from "../molecules/SeedPlayback";
import useLightHouse from "@/lib/hooks/lighthouse";
import { useEffect } from "react";

interface CreateBlocSeedProps {
  main: {
    localUrl: string;
    uploadedUrl: string;
  };
  stems: {
    localUrl: string;
    uploadedUrl: string;
  }[];
  updateValues: (update: Partial<CreateBlocState>) => void;
}

const CreateBlocSeed = ({ main, stems, updateValues }: CreateBlocSeedProps) => {
  const { uploadFile, uploadStatuses } = useLightHouse();
  console.log(uploadStatuses);
  console.log(stems);
  console.log(main);

  useEffect(() => {
    if (uploadStatuses["main"]) {
      updateValues({
        main: {
          ...main,
          uploadedUrl: uploadStatuses["main"].fileStatus?.data.Hash || "",
        },
      });
    }
    stems.forEach((_, i) => {
      if (uploadStatuses[`stems[${i}]`]) {
        const newStems = [...stems];
        newStems[i] = {
          ...newStems[i],
          uploadedUrl:
            uploadStatuses[`stems[${i}]`].fileStatus?.data.Hash || "",
        };
        updateValues({ stems: newStems });
      }
    });
  }, [uploadStatuses]);

  return (
    <Card className="w-full">
      <FieldSet
        legend="Initial Seed"
        description="Plant a seed to ignite bloc collaboration."
      >
        <Card className="flex w-full flex-col items-center !gap-8">
          <Field
            description=""
            label="Main Track"
            labelSecondary="A seed composition of merged Stem Tracks"
          >
            <FileInput
              accept="audio/*"
              onChange={async (file) => {
                const url = URL.createObjectURL(file);
                updateValues({ main: { localUrl: url, uploadedUrl: "" } });
                // Create a synthetic event object
                const event = {
                  target: {
                    files: [file],
                  },
                  persist: () => {},
                };
                await uploadFile(event, "main");
              }}
              onReset={() =>
                updateValues({ main: { localUrl: "", uploadedUrl: "" } })
              }
            >
              {(context) =>
                context.name ? (
                  <div className="flex items-center gap-2">
                    {
                      <SeedPlayback
                        id={context.name}
                        name={context.name}
                        url={main.localUrl}
                      />
                    }
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
                          <Typography className="w-[4ch]" fontVariant="smallBold">
                            {uploadStatuses["main"]?.percentage}
                          </Typography>
                        </div>
                  </div>
                ) : (
                  <div>{context.droppable ? "Drop track" : "Attach track"}</div>
                )
              }
            </FileInput>
          </Field>
          <Field
            description=""
            label="Stem Tracks"
            labelSecondary="A stem collection making up the Main Track"
          >
            <div className="flex flex-col gap-4">
              {stems.map((_, i) => (
                <FileInput
                  accept="audio/*"
                  onChange={async (file) => {
                    const url = URL.createObjectURL(file);
                    const newStems = [...stems];
                    newStems[i] = { localUrl: url, uploadedUrl: "" };
                    updateValues({
                      stems: [...newStems, { localUrl: url, uploadedUrl: "" }],
                    });
                    // Create a synthetic event object
                    const event = {
                      target: {
                        files: [file],
                      },
                      persist: () => {},
                    };
                    await uploadFile(event, `stems[${i}]`);
                  }}
                  onReset={() => {
                    const newStems = [...stems];
                    newStems.splice(i, 1);
                    updateValues({
                      stems: newStems,
                    });
                  }}
                >
                  {(context) =>
                    context.name ? (
                      <div className="flex items-center gap-2">
                        {
                          <SeedPlayback
                            key={i}
                            id={i.toString()}
                            name={context.name}
                            url={stems[i].localUrl}
                          />
                        }
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
                          <Typography className="w-[4ch]" fontVariant="smallBold">
                            {uploadStatuses[`stems[${i}]`]?.percentage}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {context.droppable ? "Drop track" : "Attach track"}
                      </div>
                    )
                  }
                </FileInput>
              ))}
            </div>
          </Field>
        </Card>
      </FieldSet>
    </Card>
  );
};

export default CreateBlocSeed;
