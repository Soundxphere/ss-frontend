import GuildMemberCard from "@/components/organisms/BlocMemberCard";

const GuildMemberData: any[] = [];

export default function BlocInfoPage() {
  return (
    <div className=" flex max-w-[800px] w-full flex-col gap-16  pb-8">
      <div className=" flex flex-col gap-4">
        <p className=" pb-2 font-outfit font-semibold text-2xl text-[#484E62]">
          Creator
        </p>

        <GuildMemberCard
          walletAddress={GuildMemberData[0].walletAddress}
          date={GuildMemberData[0].date}
        />
      </div>

      <div className=" flex flex-col gap-4">
        <p className=" pb-2 font-outfit font-semibold text-2xl text-[#484E62]">
          Members
        </p>
        {GuildMemberData.map((data, i) => {
          if (i != 0) {
            return <GuildMemberCard {...data} key={i} />;
          }
        })}
      </div>
    </div>
  );
}
