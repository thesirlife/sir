import { Divider } from "@mui/material";
import Link from "next/link";

const LoggedOutFooter = () => {
  return (
    <footer className="bg-green-primary flex flex-row justify-between h-[72px] align-center px-8 ">
      <p className="items-center flex">&copy; SIR 2024</p>
      <div className="flex items-center">
        <div className="max-h-7 flex flex-row gap-4 items-center">
          <Link href="#" className="underline decoration-green-secondary">
            Get Support
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className="bg-orange-light"
          />
          <Link href="#" className="underline decoration-green-secondary">
            Terms & Conditions
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className="bg-orange-light"
          />
          <Link href="#" className="underline decoration-green-secondary">
            About SIR
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className="bg-orange-light"
          />
          <Link href="#" className="underline decoration-green-secondary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default LoggedOutFooter;
