type Link = {
  href: string;
};

type Links = {
  self: Link[];
  collection: Link[];
  about: Link[];
  "wp:attachment": Link[];
  curies: {
    name: string;
    href: string;
    templated: boolean;
  }[];
};

export type Trivia = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  template: string;
  correct_answer: string;
  incorrect_answer_1: string;
  incorrect_answer_2: string;
  trivia_meta_snippet: string;
  _links: Links;
};
