"use client";

import {
  Avatar,
  Button,
  Card,
  CrossSVG,
  Field,
  FieldSet,
  FileInput,
  Input,
  Textarea,
  Typography,
  VisuallyHidden,
} from "@ensdomains/thorin";
import { useState } from "react";

import FeedCover from "@/components/atoms/FeedCover";
import TagsInput from "@/components/molecules/TagInput";

export default function FeedPage() {
  const [profileImageUrl, setProfileImageUrl] = useState("");

  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-12">
      <FeedCover />
      <div className="flex w-full gap-12">
        <div className="flex w-full flex-col gap-12">
          <div className="flex w-full flex-col gap-8">
            <Card className="w-full">
              <FieldSet
                legend="Box Info"
                description="Capture your box's essence with key details."
              >
                <Input label="Name" placeholder="Seed Box Name" />
                <Textarea
                  label="Description"
                  placeholder="Describe this profile"
                />
                <TagsInput />
              </FieldSet>
              <Field
                description="Link TikTok to expand music's audience reach"
                label="Posts"
              >
                <Button
                  className="!bg-[#ff0050]"
                  disabled={false}
                  loading={true}
                  onClick={() => {}}
                >
                  Link TikTok
                </Button>
              </Field>
            </Card>
            <Card className="w-full">
              <FieldSet
                legend="Visual Assets"
                description="Upload distinctive visuals that represent your box."
              >
                <Card>
                  <Field description="" label="Asset Preview">
                    <div className="flex w-full flex-col items-center">
                      <div className="w-36 overflow-hidden rounded-lg">
                        <Avatar
                          shape="square"
                          src={profileImageUrl}
                          label="preview avatar"
                        />
                      </div>
                    </div>
                  </Field>
                </Card>
                <FileInput
                  accept="image/jpeg,image/png"
                  onChange={async (file) => {
                    const url = URL.createObjectURL(file);
                    setProfileImageUrl(url);
                  }}
                  onReset={() => setProfileImageUrl("")}
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
                      <div>
                        {context.droppable ? "Drop avatar" : "Attach avatar"}
                      </div>
                    )
                  }
                </FileInput>
              </FieldSet>
            </Card>
          </div>
          <Button
            className="!bg-[#4E81FF]"
            disabled={false}
            loading={true}
            onClick={() => {}}
          >
            Submit
          </Button>
        </div>

        <Card className="h-max w-full !max-w-sm">
          <Typography fontVariant="extraLargeBold" className="!font-outfit">
            Tip
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography>
            Link a dedicated TikTok account for your box, so we can cross-post
            to a wider audience reach.
          </Typography>
        </Card>
      </div>
    </div>
  );
}
