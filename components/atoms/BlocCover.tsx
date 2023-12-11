import Image from "next/image";

interface BlocCoverProp {
  src: string;
  alt?: string;
}

const BlocCover = ({ src, alt = "" }: BlocCoverProp) => {
  return (
    <section className=" relative flex h-[19rem] w-full max-w-[1228px] items-center justify-center overflow-hidden rounded-[1.25rem]">
      <Image
        {...{ src, alt }}
        style={{
          objectFit: "cover",
          zIndex: 0,
        }}
        fill
        priority
      />
    </section>
  );
};

export default BlocCover;
