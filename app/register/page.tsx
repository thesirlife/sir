import { Paper } from "@mui/material";
import RegisterForm from "../components/Register/Form";

const LoggedOutPage = () => {
  return (
    <div className="flex items-center justify-center w-full my-6">
      <Paper square className="max-w-[760px] w-full p-16">
        <div className="flex flex-col items-center">
          <h2 className="font-bold">Setup Your Account</h2>
          <p className="text-lg mb-4 opacity-60">
            Enter your information below to finish setting up your SIR account.
          </p>
        </div>
        <RegisterForm />
      </Paper>
    </div>
  );
};

export default LoggedOutPage;
