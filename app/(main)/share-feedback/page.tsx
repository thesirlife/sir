import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Survey from "./survey";

export const metadata = {
  title: "Share Feedback",
  description: "Share feedback about your experience with SIR.",
};

const ShareFeedback = async () => {
  const session = await auth();
  if (!session?.user.email) {
    redirect("/enter-box-code");
  }

  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container ">
        <div className="py-10">
          <Breadcrumbs />
          <h1 className="text-3xl font-bold">Share Feedback</h1>
        </div>
      </div>
      <Survey />
    </div>
  );
};

export default ShareFeedback;
