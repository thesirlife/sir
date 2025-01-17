import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import Badges from "./badges";
import { auth } from "@/auth";
import getCurrentUser from "@/app/data/getCurrentUser";
import { redirect } from "next/navigation";
import getAuthJwt from "@/app/data/getAuthJwt";

export const metadata = {
  title: "My Badges",
  description: "View your badges, both completed and in progress.",
};

const MyBadges = async () => {
  const session = await auth();
  if (!session?.user.email) {
    redirect("/enter-box-code");
  }
  const jwt = await getAuthJwt();
  const user = await getCurrentUser(session?.user.jwt as string);
  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container ">
        <div className="py-10 max-lg:px-4">
          <Breadcrumbs />
          <h1 className="text-3xl font-bold">My Badges</h1>
        </div>
      </div>
      <div className="container pb-12">
        <div className="flex flex-row gap-5 flex-wrap justify-center md:justify-between mb-14">
          <Badges user={user} userId={Number(session?.user.id)} jwt={jwt} />
        </div>
      </div>
    </div>
  );
};

export default MyBadges;
