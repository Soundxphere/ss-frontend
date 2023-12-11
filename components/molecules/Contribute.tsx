import { CardStackPlusIcon } from "@radix-ui/react-icons";

const Contribute = () => {
  return (
    <button className="flex h-min place-items-center gap-2 rounded-lg bg-[#4E81FF] px-2 py-1.5 font-outfit text-sm font-semibold text-white transition-all">
      <CardStackPlusIcon width={"1.5rem"} height={"1.5rem"} />
      <span style={{ letterSpacing: "1px" }}>Contribute</span>
    </button>
  );
};

export default Contribute;
