import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { TriviaPost } from "../types/trivia/types";

dayjs.extend(timezone);
dayjs.extend(utc);

type AuthResponse = {
  success: boolean;
  statusCode: number;
  code: string;
  message: string;
  data: {
    token: string;
    id: number;
    email: string;
    nicename: string;
    firstName: string;
    lastName: string;
    displayName: string;
  };
};

const getTrivia = async (): Promise<TriviaPost> => {
  let sot = dayjs().startOf("day").tz("America/Denver", true).format();
  const eot = dayjs().endOf("day").tz("America/Denver", true).format();
	console.log(sot);
	console.log(eot);

  const res = await fetch(`${process.env.NEXT_PUBLIC_WPAUTH_ENDPOINT}/token`, {
    method: "POST",
    body: JSON.stringify({
      username: "kelly@edgesfirst.co",
      password: process.env.WP_PASSWORD,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const parsedResponse: AuthResponse = await res.json();
  const jwt = parsedResponse.data.token;

	console.log(`${
		process.env.NEXT_PUBLIC_WPREST_ENDPOINT
	}/trivia?after=${encodeURIComponent(sot)}&before=${encodeURIComponent(
		eot
	)}`);

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_WPREST_ENDPOINT
    }/trivia?after=${encodeURIComponent(sot)}&before=${encodeURIComponent(
      eot
    )}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );

  const trivia = await response.json();

  return trivia[0];
};

export default getTrivia;
