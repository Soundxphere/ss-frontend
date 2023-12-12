
const GuildMemberData: any[] = [];

export default function BlocInfoPage() {
  return (
    <div className=" flex max-w-[800px] w-full flex-col gap-16  pb-8">
      <div className=" flex flex-col gap-4">
        <p className=" pb-2 font-outfit font-semibold text-2xl text-[#484E62]">
          Creator
        </p>


      </div>

      <div className=" flex flex-col gap-4">
        <p className=" pb-2 font-outfit font-semibold text-2xl text-[#484E62]">
          Members
        </p>

      </div>
    </div>
  );
}
