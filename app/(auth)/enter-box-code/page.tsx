import EnterBoxCodeForm from "@/app/components/EnterBoxCode/EnterBoxCode";
import SignInForm from "@/app/components/SignIn/Form";
import { auth } from "@/auth";
import Paper from "@mui/material/Paper";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  // const session = await auth();
  // if (session?.user.email) {
  //   redirect(`/`);
  // }

  return (
    <div className="flex items-center justify-center w-full my-6">
      <Paper square className="max-w-[760px] w-full p-16">
        <EnterBoxCodeForm />
      </Paper>
    </div>
  );
};

export default SignInPage;
