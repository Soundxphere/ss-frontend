import InteractivePost from "../molecules/InteractivePost";

export interface Post {
  type: "image" | "text" | "audio";
  imageUrl?: string;
  caption?: string;
  textContent?: string;
  audioUrl?: string;
  description?: string;
  author: {
    name: string;
    avatarUrl: string;
    box: string;
  };
  likes: number;
}

type FeedProps = {
  posts: Post[];
};

function Feed({ posts }: FeedProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      {posts.map((post, index) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-3xl border bg-white p-6"
          >
            <InteractivePost key={index} post={post} />
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
