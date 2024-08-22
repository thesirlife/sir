import EnterBoxCodeForm from "@/app/components/EnterBoxCode/EnterBoxCode";
import Header from "@/app/components/global/header";
import { auth } from "@/auth";
import Paper from "@mui/material/Paper";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Enter Box Code",
  description: "The page to enter the box code.",
};

const BoxCodePage = async () => {
  const session = await auth();
  if (session?.user.email) {
    redirect(`/`);
  }

  return (
    <>
      <Header isLoggedIn={Boolean(session?.user.email)} />
      <div className="flex items-center justify-center w-full my-6">
        <Paper square className="max-w-[760px] w-full px-6 py-8 sm:p-16">
          <EnterBoxCodeForm />
        </Paper>
      </div>
    </>
  );
};

export default BoxCodePage;
