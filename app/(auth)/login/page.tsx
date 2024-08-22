import SignInForm from "@/app/components/SignIn/Form";
import Header from "@/app/components/global/header";
import { auth } from "@/auth";
import Paper from "@mui/material/Paper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login to SIR",
  description: "Login to SIR.",
};

const SignInPage = async () => {
  const session = await auth();
  if (session?.user?.email) {
    redirect(`/`);
  }

  return (
    <>
      <Header isLoggedIn={Boolean(session?.user?.email)} onLoginPage />
      <div className="flex items-center justify-center w-full my-6">
        <Paper square className="max-w-[760px] w-full p-16">
          <SignInForm />
        </Paper>
      </div>
    </>
  );
};

export default SignInPage;
