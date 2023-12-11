"use client";

import { Select } from "@ensdomains/thorin";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DiscIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { useMemo } from "react";

import Contribute from "@/components/molecules/Contribute";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segments = useSelectedLayoutSegments();

  const { bloc: blocId } = useParams();

  const navItems = useMemo(
    () => [
      {
        name: "Active",
        href: `/blocs/${blocId}/contributions/`,
        isActive: segments.length === 0,
        icon: <DiscIcon width={"1.5rem"} height={"1.5rem"} />,
      },
      {
        name: "Closed",
        href: `/blocs/${blocId}/contributions/closed`,
        isActive: segments.includes("closed"),
        icon: <CrossCircledIcon width={"1.5rem"} height={"1.5rem"} />,
      },
      {
        name: "Completed",
        href: `/blocs/${blocId}/contributions/completed`,
        isActive: segments.includes("completed"),
        icon: <CheckCircledIcon width={"1.5rem"} height={"1.5rem"} />,
      },
    ],
    [blocId, segments],
  );

  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-4 ">
      <nav className="flex items-center justify-between gap-8">
        <div className="flex gap-4 font-outfit text-base font-medium">
          {navItems.map(({ name, href, isActive, icon }) => (
            <Link
              key={name}
              href={href}
              scroll={true}
              className={cn(
                "flex items-center",
                { "bg-stone-200": isActive },
                "active:bg-stone-300] rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200",
              )}
            >
              <div className="flex items-center gap-1">
                {icon}
                <span>{name}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <Select
            align="left"
            label=""
            size="small"
            className="mt-[-0.5rem] !gap-0"
            value="1"
            options={[
              { value: "1", label: "Round One" },
              { value: "2", label: "Round Two" },
              { value: "3", label: "Round Three" },
              { value: "4", label: "Round Four" },
            ]}
          />{" "}
          <Contribute />
        </div>
      </nav>

      {children}
    </div>
  );
}
