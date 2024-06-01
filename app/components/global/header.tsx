import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/sir-header-logo.svg";
import { FC } from "react";
import Button from "./Button";
import { ArrowForward } from "@mui/icons-material";

type HeaderProps = {
  isLoggedIn?: boolean;
};

const Header: FC<HeaderProps> = ({ isLoggedIn }: HeaderProps) => {
  return (
    <header className="bg-green-primary flex flex-row justify-between h-[72px] align-center ">
      <div className="pl-4 items-center flex">
        <Image src={Logo} alt="SIR Header Logo" />
      </div>
      {isLoggedIn ? (
        <nav className="flex gap-4 flex-row items-center pr-4">
          <Link className="underline" href="/dashboard">
            My Hub
          </Link>
          <Link className="underline" href="/my-badges">
            My Badges
          </Link>
          <Link className="underline" href="/get-support">
            Get Support
          </Link>
        </nav>
      ) : (
        <div className="flex flex-row gap-4 items-center pr-4">
          <p>Already created your account?</p>
          <Button
            variant="contained"
            color="warning"
            endIcon={<ArrowForward fontSize="medium" />}
          >
            Log In
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
