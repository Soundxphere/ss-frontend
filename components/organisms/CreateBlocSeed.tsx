import {
  Button,
  Card,
  CrossSVG,
  Field,
  FieldSet,
  FileInput,
  VisuallyHidden,
} from "@ensdomains/thorin";
import { useState } from "react";

import SeedPlayback from "../molecules/SeedPlayback";

const CreateBlocSeed = () => {
  const [main, setMain] = useState("");
  const [stems, setStems] = useState([""]);

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
                setMain(url);
              }}
              //   onReset={() => setMain("")}
            >
              {(context) =>
                context.name ? (
                  <div className="flex items-center gap-2">
                    {
                      <SeedPlayback
                        id={context.name}
                        name={context.name}
                        url={main}
                      />
                    }
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
                    setStems((prev) => {
                      const latest = [...prev];
                      if (!latest[i]) {
                        latest.push("");
                      }
                      latest[i] = url;
                      return latest;
                    });
                  }}
                  onReset={() =>
                    setStems((prev) => {
                      const latest = [...prev];
                      latest.splice(i, 1);
                      return latest;
                    })
                  }
                >
                  {(context) =>
                    context.name ? (
                      <div className="flex items-center gap-2">
                        {
                          <SeedPlayback
                            key={i}
                            id={i.toString()}
                            name={context.name}
                            url={stems[i]}
                          />
                        }
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
