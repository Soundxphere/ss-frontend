"use client";

import { Button, Slider, Typography } from "@ensdomains/thorin";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";

interface SeedPlaybackProps {
  id: string;
  name: string;
  url: string;
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const formattedMinutes = `${minutes < 10 ? "0" : ""}${minutes}`;
  const formattedSeconds = `${seconds < 10 ? "0" : ""}${seconds}`;

  return hours > 0
    ? `${hours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
};

const SeedPlayback = ({ id, name, url }: SeedPlaybackProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    const audioElement = audioRef.current;
    if (audioElement === null) return;
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  };

  const changeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioElement = audioRef.current;
    if (audioElement === null) return;
    audioElement.currentTime = Number(event.target.value);
    setCurrentTime(audioElement.currentTime);
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement === null) return;
    audioElement.addEventListener("loadedmetadata", () => {
      setDuration(audioElement.duration);
    });
    audioElement.addEventListener("timeupdate", () => {
      setCurrentTime(audioElement.currentTime);
    });
  }, [isPlaying]);

  return (
    <div
      key={id}
      className="flex w-full items-center gap-4 rounded-2xl bg-slate p-4 text-white"
      onTouchStart={(event) => event.stopPropagation()}
    >
      <Button
        className="!bg-[#4E81FF]"
        onClick={togglePlay}
        shape="circle"
        onTouchStart={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {isPlaying ? (
          <Pause className="pointer-events-none" size={24} weight="fill" />
        ) : (
          <Play className="pointer-events-none" size={24} weight="fill" />
        )}
      </Button>

      <div className="flex w-full gap-2">
        <Typography
          font="mono"
          color="inherit"
          className="w-full max-w-[7ch] text-right"
        >
          {formatTime(currentTime)}
        </Typography>
        <Slider
          min={0}
          max={duration}
          value={currentTime}
          onChange={changeTime}
          className="items center flex h-full w-full"
          label={undefined}
        />
        <Typography font="mono" color="inherit" className="w-full max-w-[7ch]">
          {formatTime(duration)}
        </Typography>
      </div>

      {name && (
        <Typography
          ellipsis
          color="inherit"
          className="w-[24ch] text-sm font-medium"
        >
          {name}
        </Typography>
      )}

      <audio ref={audioRef} className="hidden" src={`${url}`} />
    </div>
  );
};

export default SeedPlayback;

// className="h-2 w-full bg-slate-input"
