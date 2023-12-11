"use client";

import { PageButtons } from "@ensdomains/thorin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Contribution {
  id: string;
  name: string;
}

const Contributions = () => {
  const pathname = usePathname();
  const basepath = pathname.split("/contributions")[0];
  const [pageButtons, setPageButtons] = useState<number>(1);
  const list: Contribution[] = [
    { id: "1", name: "all" },
    { id: "2", name: "in review" },
    { id: "3", name: "rejected" },
    { id: "4", name: "appealed" },
    { id: "5", name: "canceled" },
    { id: "6", name: "accepted" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {list.map((item, index) => (
        <Link
          key={index}
          href={`${basepath}/contributions/${item.id}`}
          scroll={false}
          className="rounded-lg bg-white p-5 hover:shadow-[0_2px_10px] hover:shadow-black/10"
        >
          <span>{item.name}</span>
        </Link>
      ))}
      <PageButtons
        alwaysShowFirst
        alwaysShowLast
        current={pageButtons}
        total={100}
        onChange={(value) => setPageButtons(value)}
      />
    </div>
  );
};

export default Contributions;
