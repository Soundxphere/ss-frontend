import { getOrbisCommentReplies, getOrbisPostComments, getOrbisPosts } from "@/lib/actions";
import { ellipsisAddress } from "@/lib/utils";
import { Avatar, Button, Card, Typography } from "@ensdomains/thorin";
import { useEffect, useState } from "react";

export interface CommentType {
  stream_id: string;
  type: null;
  content: {
    body: string;
    context: string;
  };
  context: string;
  creator: string;
  creator_details: {
    did: string;
    profile: {
      username: string;
      description: string;
      pfp: string;
    };
    metadata: {
      chain: string;
      address: string;
      ensName: null;
    };
    verified_email: boolean;
    count_followers: number;
    count_following: number;
  };
  context_details: {
    context_id: null;
    context_details: null;
  };
  master: null;
  reply_to: null;
  reply_to_details: null;
  reply_to_creator_details: null;
  repost_details: {
    content: null;
    stream_id: null;
    timestamp: null;
    count_likes: null;
    count_repost: null;
    count_replies: null;
    creator_details: null;
  };
  repost_creator_details: null;
  count_likes: number;
  count_haha: number;
  count_downvotes: number;
  count_replies: number;
  count_repost: number;
  timestamp: number;
  count_commits: number;
  indexing_metadata: {
    language: string;
  };
  last_reply_timestamp: number;
}

interface ButtonProps {
  count: number;
  onClick: () => void;
}

interface CommentProps {
  comment: CommentType;
  commentId?: string;
  depth: number;
}

const LikeButton = ({ count, onClick }: ButtonProps) => (
  <button onClick={onClick} className="flex items-center space-x-1">
    <span>👍</span>
    <span>{count}</span>
  </button>
);

const HahaButton = ({ count, onClick }: ButtonProps) => (
  <button onClick={onClick} className="flex items-center space-x-1">
    <span>😂</span>
    <span>{count}</span>
  </button>
);

const DownVoteButton = ({ count, onClick }: ButtonProps) => (
  <button onClick={onClick} className="flex items-center space-x-1">
    <span>👎</span>
    <span>{count}</span>
  </button>
);

const ReplyButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center space-x-1">
    <span>💬</span>
    <span>Reply</span>
  </button>
);

const Comment = ({ comment, commentId, depth }: CommentProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [replies, setReplies] = useState<CommentType[]>([]);

  useEffect(() => {
    (async () => {
      if (!commentId) return;
      setRepliesLoading(true);
      const response = await getOrbisCommentReplies(commentId);
      if (response && response.data) {
        setReplies(response.data);
      }
      setRepliesLoading(false);
    })();
    return () => {};
  }, [commentId]);

  const onLike = () => {
    // Add your logic to handle liking a
  };

  const onDownvote = () => {
    // Add your logic to handle replying to a
  };

  const onHaha = () => {
    // Add your logic to handle replying to a
  };

  const handleReply = () => {
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <Card
      className={`pl-${depth * 4} flex w-full max-w-screen-sm flex-col gap-4`}
    >
      <div className="flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center space-x-2">
          <Avatar
            src={comment.creator_details?.profile?.pfp}
            label={"Poster avatar"}
          />
        </div>
        <Typography fontVariant="bodyBold">
          {comment.creator_details.metadata.ensName ||
            ellipsisAddress(comment.creator_details.metadata.address)}
        </Typography>
      </div>
      <Typography fontVariant="body" className="!break-words !text-gray-600">
        {comment.content.body}
      </Typography>
      <Typography fontVariant="extraSmall" className="!text-gray-400">
        {new Date(comment.timestamp * 1000).toLocaleString()}
      </Typography>
      <div className="flex w-full items-center space-x-2">
        <LikeButton count={comment.count_likes} onClick={onLike} />
        <HahaButton count={comment.count_haha} onClick={onHaha} />
        <DownVoteButton count={comment.count_downvotes} onClick={onDownvote} />
        {depth === 0 && (
          <ReplyButton onClick={() => setIsReplying(!isReplying)} />
        )}
      </div>

      {isReplying && (
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="flex-grow rounded-lg border px-2 py-1.5"
            placeholder="Add a reply..."
          />

          <Button
            onClick={handleReply}
            type="button"
            className="flex !w-fit place-items-center gap-2 rounded-lg !bg-[#4E81FF] px-4 py-1.5 font-outfit text-sm font-semibold text-white transition-all"
          >
            Reply
          </Button>
        </div>
      )}

      {repliesLoading
        ? "loading..."
        : replies.map((reply, index) => (
            <Comment key={index} comment={reply} depth={depth + 1} />
          ))}
    </Card>
  );
};

export default Comment;
