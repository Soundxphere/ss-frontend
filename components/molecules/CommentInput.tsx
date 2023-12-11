import { Button } from "@ensdomains/thorin";
import { useState } from "react";

import { createOrbisComment } from "@/lib/actions";

const CommentInput = ({ postId }: { postId: string }) => {
  const [body, setBody] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    createOrbisComment({ body, master: postId });
    event.preventDefault();
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="flex-grow rounded-lg border px-2 py-1.5"
        placeholder="Add a comment..."
      />

      <Button
        type="submit"
        className="flex !w-fit place-items-center gap-2 rounded-lg !bg-[#4E81FF] px-4 py-1.5 font-outfit text-sm font-semibold text-white transition-all"
      >
        Post
      </Button>
    </form>
  );
};

export default CommentInput;
