export type User = {
  id: number;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  url: string;
  description: string;
  link: string;
  locale: string;
  nickname: string;
  slug: string;
  registered_date: string;
  roles: string[];
  password: string;
  capabilities: Record<string, boolean>;
  extra_capabilities: Record<string, boolean>;
  avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  meta: {
    persisted_preferences: any[]; // You may want to specify a more specific type for persisted preferences if known
    user_meta_brain_hq_user_id: number[];
    user_meta_box_1_puzzle: ["on" | "off" | null];
    user_meta_box_1_food_challenge: ["on" | "off" | null];
    user_meta_box_1_featured_activity: ["on" | "off" | null];
    user_meta_box_1_visited_community: ["on" | "off" | null];
  };
};
