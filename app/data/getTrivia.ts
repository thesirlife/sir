import dayjs from "dayjs";
import { TriviaPost } from "../types/trivia/types";

const getTrivia = async (): Promise<TriviaPost> => {
  const sot = dayjs().startOf("day").format();
  const eot = dayjs().endOf("day").format();

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_WPREST_ENDPOINT
    }/trivia?after=${encodeURIComponent(sot)}&before=${encodeURIComponent(
      eot
    )}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const trivia = await response.json();
  return trivia[0];
};

export default getTrivia;
