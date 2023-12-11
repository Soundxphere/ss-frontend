"use client";

import FeedCover from "@/components/atoms/FeedCover";
import CreateBlocAssets from "@/components/organisms/CreateBlocAssets";
import CreateBlocInfo from "@/components/organisms/CreateBlocInfo";
import CreateBlocSeed from "@/components/organisms/CreateBlocSeed";
import { Button, Card, Typography } from "@ensdomains/thorin";
import { useState } from "react";

export default function CreateBlocPage() {
  const [coverImageFile, setCoverImageFile] = useState("");
  const [avatarFile, setAvatarFile] = useState("");

  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-12">
      <FeedCover />
      <div className="flex w-full gap-12">
        <div className="flex w-full flex-col gap-12">
          <div className="flex w-full flex-col gap-8">
            <CreateBlocInfo />
            <CreateBlocAssets
              {...{
                coverImageFile,
                avatarFile,
                setCoverImageFile,
                setAvatarFile,
              }}
            />
            <CreateBlocSeed />
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
            We know it's painful right now, so go light on the stem tracks 🥲
          </Typography>
        </Card>
      </div>
    </div>
  );
}
