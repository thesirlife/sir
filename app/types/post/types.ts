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
        id: number;
        date: string;
        slug: string;
        type: string;
        link: string;
        title: {
          rendered: string;
        };
        author: number;
        featured_media: number;
        caption: {
          rendered: string;
        };
        alt_text: string;
        media_type: string;
        mime_type: string;
        media_details: {
          width: number;
          height: number;
          file: string;
          filesize: number;
          sizes: {
            thumbnail: {
              file: string;
              width: number;
              height: number;
              filesize: number;
              mime_type: string;
              source_url: string;
            };
            full: {
              file: string;
              width: number;
              height: number;
              mime_type: string;
              source_url: string;
            };
          };
          image_meta: {
            aperture: string;
            credit: string;
            camera: string;
            caption: string;
            created_timestamp: string;
            copyright: string;
            focal_length: string;
            iso: string;
            shutter_speed: string;
            title: string;
            orientation: string;
            keywords: string[];
          };
        };
        source_url: string;
        _links: {
          self: { href: string }[];
          collection: { href: string }[];
          about: { href: string }[];
          author: { embeddable: boolean; href: string }[];
          replies: { embeddable: boolean; href: string }[];
        };
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
  game_link?: string;
};

export type Articles<T> = {
  total: string;
  articles: T[];
};

export type getPostsProps = {
  categories?: number;
  offset: number;
  pageSize?: number;
};
