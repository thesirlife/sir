import { Trivia } from "../types/trivia/types";

const getTrivia = async (id: number): Promise<Trivia> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/trivia/${id}`
  );
  const data = await response.json();

  return data;
};

export default getTrivia;
