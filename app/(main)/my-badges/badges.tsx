"use client";

import Badge from "@/app/components/Badge";
import { User } from "@/app/types/user/types";
import patchUser from "@/app/data/patchUser";
import { StaticImageData } from "next/image";
import food from "@/app/cta-images/food.jpg";
import community from "@/app/cta-images/community-badge.jpg";
import puzzle from "@/app/cta-images/puzzle.jpg";
import featured from "@/app/cta-images/featured.jpg";

type BadgeInfo = {
  property: keyof Omit<
    User["meta"],
    "persisted_preferences" | "user_meta_brain_hq_user_id"
  >;
  name: string;
  image: StaticImageData;
};

const BadgeList: BadgeInfo[] = [
  {
    name: "Complete the Food Challenge",
    image: food,
    property: "user_meta_box_1_food_challenge",
  },
  {
    name: "Complete the Puzzle",
    image: puzzle,
    property: "user_meta_box_1_puzzle",
  },
  {
    name: "Complete the Featured Activity",
    image: featured,
    property: "user_meta_box_1_featured_activity",
  },
  {
    name: "Visit the Community",
    image: community,
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
            image={badge.image}
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
