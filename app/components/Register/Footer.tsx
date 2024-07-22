import { Divider } from "@mui/material";
import Link from "next/link";

const LoggedOutFooter = () => {
  return (
    <footer className="bg-green-primary flex flex-row justify-between h-full md:h-[72px] align-center px-8 ">
      <p className="items-center flex">&copy; SIR 2024</p>
      <div className="flex items-center">
        <div className="flex md:flex-row flex-col md:gap-4 gap-1 md:items-center items-end max-md:py-2">
          <Link
            href="https://www.thesirlife.com/get-support"
            target="_blank"
            className="underline decoration-green-secondary"
          >
            Get Support
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className="bg-orange-light"
          />
          <Link
            href="https://www.thesirlife.com/terms-and-conditions"
            target="_blank"
            className="underline decoration-green-secondary"
          >
            Terms & Conditions
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className="bg-orange-light"
          />
          <Link
            href="https://www.thesirlife.com/faqs"
            target="_blank"
            className="underline decoration-green-secondary"
          >
            FAQ
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className="bg-orange-light"
          />
          <Link
            href="https://www.thesirlife.com/privacy-policy"
            target="_blank"
            className="underline decoration-green-secondary"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default LoggedOutFooter;
