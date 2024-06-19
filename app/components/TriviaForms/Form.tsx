import HardCodedForm, { Choice } from "../HardCodedForms/Form";

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

type TTrivia = {
  title: string;
  trivia_meta_snippet: string;
  choices: Choice[];
};

const Trivia = (trivia: TTrivia) => {
  const { title, choices, trivia_meta_snippet } = trivia;

  return (
    <div>
      <HardCodedForm choices={choices} explanation={trivia_meta_snippet}>
        {title}
      </HardCodedForm>
    </div>
  );
};

export default Trivia;
