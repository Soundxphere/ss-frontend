import { Button, Heading, Typography } from "@ensdomains/thorin";
import Image from "next/image";
import Link from "next/link";

const BlocsCover = () => {
  return (
    <section className="relative flex h-[19rem] w-full max-w-[1228px] items-center justify-start gap-12 overflow-hidden rounded-[1.25rem] bg-white">
      <div className="relative h-full w-[19rem]">
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute -bottom-24 -left-6 z-0 h-80 w-80 rounded-full bg-[#4e80ffc7] opacity-50"></div>
          <div className="absolute right-10 top-10 z-10 h-16 w-16 rounded-full bg-[#4e80ff87] opacity-50"></div>
          <div className="absolute left-5 top-20 z-20 h-8 w-8 rounded-full bg-[#4E81FF] opacity-50"></div>
        </div>
        <Image
          className="relative z-30"
          {...{ src: "/record-player.svg", alt: "Home cover" }}
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Heading className="!font-outfit" level="1">
            Explore Soundphere Blocs
          </Heading>
          <Typography
            fontVariant="large"
            color="textSecondary"
            className="!font-outfit"
          >
            Embark on a musical adventure! Crafting beats and melodies, shape
            your sound or seek collaborators
          </Typography>
        </div>

        <Link scroll={true} className="w-full" href={`/blocs/create-bloc`}>
          <Button
            prefix={
              <img
                className="w-[1.5rem]"
                src="/logo-white.svg"
                alt="soundsphere logo"
              />
            }
            loading={false}
            // onClick={openConnectModal}
            shape="rounded"
            className={"!w-max !bg-[#4E81FF] !font-outfit tracking-[1px]"}
          >
            Create a new bloc
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BlocsCover;
