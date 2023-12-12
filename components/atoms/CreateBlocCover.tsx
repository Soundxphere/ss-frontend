import Image from "next/image";

const CreateBlocCover = () => {
  return (
    <section className=" relative flex h-[19rem] w-full max-w-[1228px] items-center justify-center overflow-hidden rounded-[1.25rem] bg-white">
      <Image
        {...{ src: "/compose.svg", alt: "Home cover" }}
        style={{
          objectFit: "contain",
          zIndex: 0,
        }}
        fill
        priority
      />
    </section>
  );
};

export default CreateBlocCover;
