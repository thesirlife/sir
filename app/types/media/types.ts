export type Media = {
  date: string;
  date_gmt: string;
  guid: {
    raw: string;
    rendered: string;
  };
  id: number;
  link: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "draft" | "pending" | "private";
  type: string;
  permalink_template: string;
  generated_slug: string;
  title: {
    raw: string;
    rendered: string;
  };
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  meta: {
    _genesis_block_theme_hide_title: boolean;
  };
  template: string;
  alt_text: string;
  caption: {
    raw: string;
    rendered: string;
  };
  description: {
    raw: string;
    rendered: string;
  };
  media_type: "image" | "video" | "audio" | "application" | string;
  mime_type: string;
  media_details: Record<string, any>;
  post: number;
  source_url: string;
  missing_image_sizes: string[];
};
