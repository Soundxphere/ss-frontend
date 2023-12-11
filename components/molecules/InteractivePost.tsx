import { useState } from "react";
import { Post } from "../organisms/Feed";
import { ImagePost, TextPost, AudioPost } from "./Post";
import { Avatar, Typography } from "@ensdomains/thorin";

type InteractivePostProps = {
  post: Post;
};

function InteractivePost({ post }: InteractivePostProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {};

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center space-x-2">
          <Avatar label={""} />
        </div>
        <div>
          <Typography fontVariant="bodyBold">{post.author.name}</Typography>
          <Typography fontVariant="small">@{post.author.box}</Typography>
        </div>
      </div>
      {post.type === "image" && (
        <ImagePost imageUrl={post.imageUrl!} caption={post.caption!} />
      )}
      {post.type === "text" && <TextPost textContent={post.textContent!} />}
      {post.type === "audio" && (
        <AudioPost audioUrl={post.audioUrl!} description={post.description!} />
      )}
      <div className="flex w-full items-center space-x-2">
        <button onClick={handleLike} className="flex items-center space-x-1">
          <span>👍</span>
          <span>{liked ? post.likes + 1 : post.likes}</span>
        </button>
        <button onClick={handleComment} className="flex items-center space-x-1">
          <span>💬</span>
          <span>Comment</span>
        </button>
      </div>
    </>
  );
}

export default InteractivePost;
