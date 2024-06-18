import { Post } from "../types/post/types";
import dayjs from "dayjs";

const getTrivia = async (): Promise<Post | undefined> => {
	const sot = dayjs().startOf('day').format();
	const eot = dayjs().endOf('day').format();

	const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/trivia?after=${sot}&before=${eot}`,
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
