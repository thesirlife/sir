export type TriviaPost = {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: {
    rendered: string;
  };
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: "trivia";
  link: string;
  title: {
    rendered: string;
  };
  template: string;
  correct_answer: string;
  incorrect_answer_1: string;
  incorrect_answer_2: string;
  trivia_meta_snippet: string;
  _links: any;
};

export type TTrivia = {
  title: string;
  trivia_meta_snippet: string;
  choices: Choice[];
};

export type Choice = {
  text: string;
  isAnswer: boolean;
};
