"use client";

import Divider from "@mui/material/Divider";
import Button from "../global/Button";
import { ArrowForward } from "@mui/icons-material";

type UserExistsProps = {
  status: string;
};

const UserExists = ({ status }: UserExistsProps) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold">You Already Created Your Account</h2>
        <p className="text-lg mb-4 opacity-60">
          Use the link to login or try again.
        </p>
      </div>
      <Divider className="my-8" flexItem />
      <div className="flex flex-row gap-6 justify-center">
        <Button
          variant="text"
          onClick={() => window.location.reload()}
          color="warning"
        >
          Try Again
        </Button>
        <Button
          variant="contained"
          color="warning"
          href="/login"
          endIcon={<ArrowForward fontSize="medium" />}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default UserExists;
