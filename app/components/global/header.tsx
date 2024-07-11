import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/sir-header-logo.svg";
import Button from "./Button";
import { ArrowForward, OpenInNew } from "@mui/icons-material";

type HeaderProps = {
  isLoggedIn?: boolean;
  onLoginPage?: boolean;
};

const Header = ({ isLoggedIn, onLoginPage = false }: HeaderProps) => {
  return (
    <header className="bg-green-primary md:flex px-4 md:px-12 md:flex-row justify-between md:h-[72px] align-center ">
      <div className="items-center flex">
        <Link href="/">
          <Image src={Logo} alt="SIR Header Logo" />
        </Link>
      </div>
      {isLoggedIn ? (
        <nav className="flex gap-3 md:gap-4 flex-row items-center">
          <Link className="underline decoration-green-secondary" href="/">
            My Digital Hub
          </Link>
          <Link
            className="underline decoration-green-secondary"
            href="/my-badges"
          >
            My Badges
          </Link>
          <Link
            className="underline decoration-green-secondary"
            href="https://www.thesirlife.com/get-support"
            target="_blank"
          >
            Get Support
          </Link>
          <Button
            href="mailto:hello@thesirlife.com"
            color="warning"
            variant="contained"
          >
            Share Feedback
          </Button>
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
