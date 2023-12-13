import { Heading, Typography } from "@ensdomains/thorin";
import Image from "next/image";

const CreateBlocCover = () => {
  return (
    <section className="relative flex h-[19rem] w-full max-w-[1228px] items-center justify-start gap-12 overflow-hidden rounded-[1.25rem] bg-white">
      <div className="relative h-full w-[19rem]">
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute -left-16 -top-16 z-0 h-72 w-72 rounded-full bg-[#4e80ff] opacity-50"></div>
          <div className="absolute right-10 top-10 z-10 h-16 w-16 rounded-full bg-[#4e80ff] opacity-50"></div>
          <div className="absolute bottom-10 left-10 z-20 h-8 w-8 rounded-full bg-[#4e80ffc7] opacity-50"></div>
        </div>
        <Image
          className="relative z-30"
          {...{ src: "/compose.svg", alt: "Home cover" }}
          width={300}
          height={300}
        />
      </div>
      <div>
        <Heading className="!font-outfit" level="1">
          Create a New Bloc
        </Heading>
        <Typography
          fontVariant="large"
          color="textSecondary"
          className="!font-outfit"
        >
          Your canvas for a single music project, where beats and melodies come
          together to create something unique
        </Typography>
      </div>
    </section>
  );
};

export default CreateBlocCover;
