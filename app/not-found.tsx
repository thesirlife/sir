import { PropsWithChildren } from "react";
import { auth } from "@/auth";
import Header from "@/app/components/global/header";
import Footer from "@/app/components/global/Footer";
import LoggedOutFooter from "@/app/components/Register/Footer";
import { Paper } from "@mui/material";
const NotFound = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col items-between justify-between bg-auth bg-cover">
      <Header isLoggedIn={Boolean(session?.user.email)} />

      <div className="flex items-center justify-center w-full my-6">
        <Paper square className="max-w-[760px] w-full p-16">
          <h1 className="text-4xl font-semibold mb-4">404 - Page Not Found</h1>
          <p>
            Uh oh, looks like you&apos;ve navigated to a page that doesn&apos;t
            exist.
          </p>
        </Paper>
      </div>
      {session?.user.email ? <Footer /> : <LoggedOutFooter />}
    </div>
  );
};

export default NotFound;
