import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/sir-header-logo.svg";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-green-primary flex flex-row justify-between h-[72px] align-center ">
      <div className="pl-4 items-center flex">
        <Image src={Logo} alt="SIR Header Logo" />
      </div>
      <nav className="flex gap-4 flex-row items-center pr-4">
        <Link className="underline" href="/dashboard">
          My Dashboard
        </Link>
        <Link className="underline" href="/my-badges">
          My Badges
        </Link>
        <Link className="underline" href="/get-support">
          Get Support
        </Link>
      </nav>
    </header>
  );
};

export default Header;
