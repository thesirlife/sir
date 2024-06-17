import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import Badge from "@/app/components/Badge";

type BadgeInfo = {
  name: string;
  image: string;
};

const BadgeInfo: BadgeInfo[] = [
  {
    name: "Complete the Food Challenge",
    image: "",
  },
  {
    name: "Complete the Puzzle",
    image: "",
  },
  {
    name: "Complete the Featured Activity",
    image: "",
  },
  {
    name: "Visit the Community",
    image: "",
  },
];
const MyBadges = async () => {
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
          {/* for badges */}
          <Badge
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png"
            complete={true}
            name="Complete the Food Challenge"
          />
          <Badge
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png"
            complete={true}
            name="Complete the Puzzle"
          />
          <Badge
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png"
            complete={true}
            name="Complete the Featured Activity"
          />
          <Badge
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png"
            complete={true}
            name="Visit the Community"
          />
        </div>
      </div>
    </div>
  );
};

export default MyBadges;
