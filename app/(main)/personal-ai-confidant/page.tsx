import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ChatBot from "@/app/components/ChatBot/ChatBot";

export const metadata = {
  title: "Personal AI Confidant",
  description: "Chat with your personal AI confidant.",
};

const AIChatBot = async () => {
  const session = await auth();
  if (!session?.user.email) {
    redirect(`/`);
  }

  return (
    <>
      <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
        <div className="container">
          <div className="py-10 px-4 sm:px-0">
            <Breadcrumbs />
            <h1 className="text-3xl font-bold">Personal AI Confidant</h1>
          </div>
        </div>
      </div>
      <ChatBot userId={session?.user.id} />
    </>
  );
};

export default AIChatBot;
