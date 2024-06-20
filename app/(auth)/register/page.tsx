import { Paper } from "@mui/material";
import RegisterForm from "../../components/Register/Form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/app/components/global/header";

export const metadata = {
  title: "Register for SIR",
  description: "Register for SIR.",
};

const LoggedOutPage = async () => {
  const session = await auth();
  if (session?.user.email) {
    redirect(`/`);
  }
  return (
    <>
      <Header isLoggedIn={Boolean(session?.user.email)} />
      <div className="flex items-center justify-center w-full my-6">
        <Paper square className="max-w-[760px] w-full p-16">
          <RegisterForm />
        </Paper>
      </div>
    </>
  );
};

export default LoggedOutPage;
