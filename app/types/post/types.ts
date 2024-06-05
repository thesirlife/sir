export type Post = {
  date: string;
  date_gmt: string;
  guid: {
    raw: string;
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia": [
      {
        source_url: string;
      }
    ];
  };
  id: number;
  link: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "draft" | "pending" | "private";
  type: string;
  password?: string;
  permalink_template: string;
  generated_slug: string;
  title: {
    raw: string;
    rendered: string;
  };
  content: {
    raw: string;
    rendered: string;
    block_version: number;
    protected: boolean;
  };
  author: number;
  excerpt: {
    raw: string;
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  format: "standard";
  meta: {
    _genesis_block_theme_hide_title: boolean;
    footnotes: string;
  };
  sticky: boolean;
  template: string;
  categories: number[];
  tags?: number[];
  "game-categories"?: number[];
};

export type Articles<T> = {
  total: string;
  articles: T[];
};

export type getPostsProps = {
  categories?: number;
  offset: number;
};
