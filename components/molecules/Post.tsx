import { Typography } from "@ensdomains/thorin";
import SeedPlayback from "./SeedPlayback";

interface ImagePostProps {
  imageUrl: string;
  caption: string;
}

// src={"https://pbs.twimg.com/media/GA5MBQmXYAAOHJ0.jpg?name=orig"}

export function ImagePost({ imageUrl, caption }: ImagePostProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Typography className="font-bold">{caption}</Typography>
      <div className="relative inline-block h-64 w-max overflow-hidden rounded-lg shadow-sm md:h-96">
        <img src={imageUrl} alt={caption} className="h-full object-contain" />
      </div>
    </div>
  );
}

interface TextPostProps {
  textContent: string;
}

export function TextPost({ textContent }: TextPostProps) {
  return <Typography className="font-bold">{textContent}</Typography>;
}

interface AudioPostProps {
  audioUrl: string;
  description: string;
}

export function AudioPost({ audioUrl, description }: AudioPostProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Typography className="font-bold">{description}</Typography>
      <SeedPlayback id={""} name={""} url={audioUrl}/>
    </div>
  );
}
