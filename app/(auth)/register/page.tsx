import { Paper } from "@mui/material";
import RegisterForm from "../../components/Register/Form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoggedOutPage = async () => {
  const session = await auth();
  if (session?.user.email) {
    redirect(`/`);
  }
  return (
    <div className="flex items-center justify-center w-full my-6">
      <Paper square className="max-w-[760px] w-full p-16">
        <RegisterForm />
      </Paper>
    </div>
  );
};

export default LoggedOutPage;