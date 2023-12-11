import { Card } from "@ensdomains/thorin";
// @ts-ignore
import { Discussion } from "@orbisclub/components";
import "@orbisclub/components/dist/index.modern.css";

const CommentSection = ({ postId }: { postId: string }) => {
  return (
    <Card className="flex w-full flex-col !rounded-3xl !p-0">
      <span className="p-6 font-outfit font-medium">COMMENTS</span>
      <div className="w-full [&>*:first-child]:rounded-none [&>*:first-child]:border-none">
        <Discussion theme="YOUR_THEME_ID" context={postId} />
      </div>
    </Card>
  );

  // const [comments, setComments] = useState<CommentType[]>();
  // useEffect(() => {
  //   (async () => {
  //     const response = await getOrbisPostComments("");
  //     if (response && response.data) {
  //       setComments(response.data);
  //     }
  //   })();
  //   return () => {};
  // }, [postId]);
  // return (
  //   <Card className="flex w-full max-w-screen-sm flex-col gap-4 bg-white p-6">
  //     <span className="font-outfit font-medium">COMMENTS</span>
  //     <CommentInput postId={postId} />
  //     {comments?.map((comment, index) => (
  //       <Comment
  //         key={index}
  //         comment={comment}
  //         depth={0}
  //         commentId={comment.stream_id}
  //       />
  //     ))}
  //   </Card>
  // );
};

export default CommentSection;
