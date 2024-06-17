"use client";

import Badge from "@/app/components/Badge";
import { User } from "@/app/types/user/types";
import patchUser from "@/app/data/patchUser";

type BadgeInfo = {
  property: keyof Omit<
    User["meta"],
    "persisted_preferences" | "user_meta_brain_hq_user_id"
  >;
  name: string;
  image: string;
};

const BadgeList: BadgeInfo[] = [
  {
    name: "Complete the Food Challenge",
    image: "",
    property: "user_meta_box_1_food_challenge",
  },
  {
    name: "Complete the Puzzle",
    image: "",
    property: "user_meta_box_1_puzzle",
  },
  {
    name: "Complete the Featured Activity",
    image: "",
    property: "user_meta_box_1_featured_activity",
  },
  {
    name: "Visit the Community",
    image: "",
    property: "user_meta_box_1_visited_community",
  },
];

type BadgeProps = {
  user: User;
};

const Badges = ({ user }: BadgeProps) => {
  return (
    <>
      {BadgeList.map((badge) => {
        const badgeComplete = user.meta[badge.property][0] == "on";
        return (
          <Badge
            key={badge.name}
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png"
            // this could be cleaned up immensely if we made these values in usermeta
            complete={badgeComplete ? true : false}
            onClick={() => {
              badgeComplete
                ? patchUser({
                    id: user.id,
                    property: badge.property,
                    value: false,
                  })
                : patchUser({
                    id: user.id,
                    property: badge.property,
                    value: true,
                  });
            }}
            name={badge.name}
          />
        );
      })}
    </>
  );
};

export default Badges;
