import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import Badges from "./badges";
import { auth } from "@/auth";
import getCurrentUser from "@/app/data/getCurrentUser";

const MyBadges = async () => {
  const session = await auth();
  const user = await getCurrentUser(session?.user.jwt as string);
  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container ">
        <div className="py-10">
          <Breadcrumbs />
          <h1 className="text-3xl font-bold">My Badges</h1>
        </div>
      </div>
      <div className="container pb-12">
        <div className="flex flex-row gap-5 flex-wrap justify-between">
          <Badges user={user} userId={Number(session?.user.id)} />
        </div>
      </div>
    </div>
  );
};

export default MyBadges;
