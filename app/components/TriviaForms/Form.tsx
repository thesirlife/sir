import { TTrivia } from "@/app/types/trivia/types";
import HardCodedForm from "../HardCodedForms/Form";

const Trivia = (trivia: TTrivia) => {
  const { title, choices, trivia_meta_snippet, userId } = trivia;

  return (
    <div>
      <HardCodedForm userId={userId} choices={choices} explanation={trivia_meta_snippet}>
        {title}
      </HardCodedForm>
    </div>
  );
};

export default Trivia;
