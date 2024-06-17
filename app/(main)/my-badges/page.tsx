import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import Badges from "./badges";
import { auth } from "@/auth";
import getUserById from "@/app/data/getUserById";

const MyBadges = async () => {
  const session = await auth();
  const user = await getUserById(session?.user.id as number);
  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container">
        <div className="py-10">
          <Breadcrumbs />
          <h1 className="text-3xl font-bold">My Badges</h1>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-row gap-5 flex-wrap justify-between">
          <Badges user={user} />
        </div>
      </div>
    </div>
  );
};

export default MyBadges;
