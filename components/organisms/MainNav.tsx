"use client";
import { cn } from "@/lib/utils";
import { Typography } from "@ensdomains/thorin";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useMemo } from "react";
import Login from "../molecules/Login";

const MainNav = () => {
  const segments = useSelectedLayoutSegments();

  const navItems = useMemo(
    () => [
      {
        name: "Home",
        href: "/",
        isActive: segments.length === 0,
      },
      {
        name: "Blocs",
        href: "/blocs",
        isActive: segments.includes("blocs"),
      },
      {
        name: "SGov",
        href: "/sgov",
        isActive: segments.includes("sgov"),
      },
    ],
    [segments],
  );

  return (
    <div className="flex w-full justify-between bg-white px-6 py-5">
      <div className="flex items-center gap-8">
        <Link className="rounded-full" href={"/"}>
          <img width={50} height={50} src="/logo.svg" alt="soundsphere logo" />
        </Link>
        <div className="flex gap-4">
          {navItems.map(({ name, href, isActive }) => (
            <Link
              key={name}
              href={href}
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
              >
                {name}
              </Typography>
            </Link>
          ))}
          <Link
            href={"/dispenser"}
            className={cn(
              "flex items-center rounded-lg bg-[#4E81FF] px-2 py-1.5 text-white transition-all duration-150 ease-in-out hover:bg-[#4E81FF] active:bg-[#4E81FF]",
            )}
          >
            <Typography
              className="!font-outfit"
              color="inherit"
              fontVariant="bodyBold"
            >
              Dispenser
            </Typography>
          </Link>
        </div>
      </div>
      <Login />
    </div>
  );
};

export default MainNav;
