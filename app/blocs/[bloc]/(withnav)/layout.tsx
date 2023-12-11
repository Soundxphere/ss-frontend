"use client";

import { Avatar, Typography } from "@ensdomains/thorin";
import Link from "next/link";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Cover from "@/components/atoms/BlocCover";
import NavBar from "@/components/organisms/NavBar";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segments = useSelectedLayoutSegments();

  const [data, setData] = useState({
    avatar: "",
    bio: "",
    coverImage: "",
    displayName: "",
    address: "",
  });

  useEffect(() => {
    setData({
      avatar: "https://images.unsplash.com/photo-1667835949430-a2516cc93d27",
      bio: "",
      coverImage:
        "https://images.unsplash.com/photo-1521913626209-0fbf68f4c4b1",
      displayName: "mounum3ntal",
      address: "0x5b...caa5",
    });
  }, []);

  const { bloc: blocId } = useParams();

  const navItems1 = useMemo(
    () => [
      {
        name: "Discography",
        href: `/blocs/${blocId}/`,
        isActive: segments.length === 0,
      },
      {
        name: "Status",
        href: `/blocs/${blocId}/status`,
        isActive: segments.includes("status"),
      },
      {
        name: "Contributions",
        href: `/blocs/${blocId}/contributions`,
        isActive: segments.includes("contributions"),
      },
      {
        name: "Collection",
        href: `/blocs/${blocId}/collection`,
        isActive: segments.includes("collection"),
      },
      {
        name: "Bloc",
        href: `/blocs/${blocId}/bloc`,
        isActive: segments.includes("bloc"),
      },
    ],
    [blocId, segments],
  );

  const navItems2 = useMemo(
    () => [
      {
        name: "Admin deck",
        href: `/blocs/${blocId}/admin`,
        isActive: segments.includes("admin"),
      },
      {
        name: "Settings",
        href: `/blocs/${blocId}/settings`,
        isActive: segments.includes("settings"),
      },
    ],
    [blocId, segments],
  );

  return (
    <div className="flex h-full w-full max-w-[1228px] flex-col gap-4">
      <div>
        <div className="flex flex-col items-center">
          <Cover
            src={
              data.coverImage ||
              `https://avatar.vercel.sh/kelvinpraisoes@gmail.com`
            }
          />
          <div className="mt-[-5rem] h-40 w-40">
            <Avatar src={data.avatar} label={data.displayName} noBorder />
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center">
          <Typography
            className="!font-bebas"
            color="inherit"
            fontVariant="headingOne"
          >
            {data.displayName}
          </Typography>
          <Typography className="!font-outfit" color="inherit" weight="light">
            by {data.address}
          </Typography>
        </div>
      </div>

      <NavBar>
        <div className="flex gap-4">
          {navItems1.map(({ name, href, isActive }) => (
            <Link
              key={name}
              href={href}
              scroll={true}
              className={cn(
                "flex items-center",
                { "bg-stone-200": isActive },
                "rounded-lg px-2 py-1.5 text-[#2B6CB0] transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300",
              )}
            >
              <Typography
                className="!font-outfit"
                color="inherit"
                fontVariant="bodyBold"
                weight="extraBold"
              >
                {name}
              </Typography>
            </Link>
          ))}
        </div>

        <div className="flex gap-4">
          {navItems2.map(({ name, href, isActive }) => (
            <Link
              key={name}
              href={href}
              scroll={true}
              className={cn(
                "flex items-center",
                { "bg-stone-200": isActive },
                "rounded-lg px-2 py-1.5 text-[#2B6CB0] transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300",
              )}
            >
              <Typography
                className="!font-outfit"
                color="inherit"
                fontVariant="bodyBold"
                weight="extraBold"
              >
                {name}
              </Typography>
            </Link>
          ))}
        </div>
      </NavBar>

      {children}
    </div>
  );
}
