import Image from "next/image";

const HomeCover = () => {
  return (
    <section className=" relative flex h-[19rem] w-full max-w-[1228px] items-center justify-center overflow-hidden rounded-[1.25rem]">
      <Image
        {...{ src: "/Frame_1.webp", alt: "Home cover" }}
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

export default HomeCover;
