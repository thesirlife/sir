import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/sir-header-logo.svg";
import Button from "./Button";
import { ArrowForward } from "@mui/icons-material";

type HeaderProps = {
  isLoggedIn?: boolean;
  onLoginPage?: boolean;
};

const Header = ({ isLoggedIn, onLoginPage = false }: HeaderProps) => {
  return (
    <header className="bg-green-primary flex px-4 md:px-12 flex-row justify-between h-[72px] align-center ">
      <div className="items-center flex">
        <Link href="/">
          <Image src={Logo} alt="SIR Header Logo" />
        </Link>
      </div>
      {isLoggedIn ? (
        <nav className="flex gap-3 md:gap-4 flex-row items-center">
          <Link className="underline" href="/">
            My Hub
          </Link>
          <Link className="underline" href="/my-badges">
            My Badges
          </Link>
          <Link className="underline" href="/get-support">
            Get Support
          </Link>
        </nav>
      ) : onLoginPage ? (
        <div className="flex flex-row gap-4 items-center">
          <p>Do you have a box number?</p>
          <Button
            variant="contained"
            color="warning"
            href="/enter-box-code"
            endIcon={<ArrowForward fontSize="medium" />}
          >
            Create Your Account
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-4 items-center">
          <p>Already created your account?</p>
          <Button
            variant="contained"
            color="warning"
            href="/login"
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
