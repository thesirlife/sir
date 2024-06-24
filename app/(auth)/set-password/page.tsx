import Header from "@/app/components/global/header";
import { Paper } from "@mui/material";
import { auth } from "@/auth";
import SetPasswordForm from "./Form";

const SetPasswordPage = async () => {
  const session = await auth();

  return (
    <>
      <Header isLoggedIn={Boolean(session?.user.email)} onLoginPage />
      <div className="flex items-center justify-center w-full my-6">
        <Paper square className="max-w-[760px] w-full p-16">
          <SetPasswordForm />
        </Paper>
      </div>
    </>
  );
};

export default SetPasswordPage;
