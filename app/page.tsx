"use client";

import FeedCover from "@/components/atoms/FeedCover";
import Feed, { Post } from "@/components/organisms/Feed";
import { Card, Typography } from "@ensdomains/thorin";
import { useState, useEffect } from "react";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    setPosts(samplePosts);
  }, []);
  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-12">
      <FeedCover />
      <div className="flex w-full gap-12">
        <Feed posts={posts} />
        <Card className="h-max w-full !max-w-sm">
          <Typography fontVariant="extraLargeBold" className="!font-outfit">
            Tip
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Card>
      </div>
    </div>
  );
}

const samplePosts: Post[] = [
  {
    type: "image",
    imageUrl: "https://pbs.twimg.com/media/GA2-WPqX0AEGmSV.jpg?name=orig",
    caption: "An interesting image",
    author: {
      name: "John Doe",
      avatarUrl: "https://example.com/avatar1.jpg",
      box: "Dentalz",
    },
    likes: 6,
  },
  {
    type: "text",
    textContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: {
      name: "Jane Smith",
      avatarUrl: "https://example.com/avatar2.jpg",
      box: "grain",
    },
    likes: 6,
  },
  {
    type: "audio",
    audioUrl: "https://example.com/audio1.mp3",
    description: "An intriguing audio post",
    author: {
      name: "Alice Johnson",
      avatarUrl: "https://example.com/avatar3.jpg",
      box: "Da Babys",
    },
    likes: 6,
  },
];
