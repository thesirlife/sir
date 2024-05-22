export type Tag = {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: "category" | "post_tag" | string; // Assuming other taxonomies might exist
  meta: Record<string, any>;
};
