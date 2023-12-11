import React from "react";
import * as Separator from "@radix-ui/react-separator";

const DiscographyInfo = ({
  children,
  info,
}: {
  children: React.ReactNode;
  info: any;
}) => {
  return (
    <div className="flex h-full w-full max-w-xs flex-col justify-between rounded-2xl bg-slate p-4 text-white">
      <div className="flex flex-col gap-4">
        <span className=" font-outfit text-3xl font-semibold ">
          {info.blocName}
        </span>
        <span className="font-outfit text-lg font-light">{info.blocDesc}</span>
        <ul className="flex flex-col items-center justify-between gap-2">
          <ListItems>
            <span>Genre</span>
            <span>Electronic</span>
          </ListItems>
          <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
          <ListItems>
            <span>Chain</span>
            <span>{info.chain}</span>
          </ListItems>
          <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
          <ListItems>
            <span>Status</span>
            <span>{info.status}</span>
          </ListItems>
          <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
          <ListItems>
            <span>Began</span>
            <span>{info.began}</span>
          </ListItems>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default DiscographyInfo;

const ListItems = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="flex w-full items-center justify-between text-sm">
      {children}
    </li>
  );
};
