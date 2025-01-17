import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { TriviaPost } from "../types/trivia/types";

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
	// Set to UTC-6 for America/Denver, to match the WordPress settings
	// This allows for the Trivia posts 'scheduled' posts
  const sot = dayjs().utcOffset(-6).startOf("day").format();
  const eot = dayjs().utcOffset(-6).endOf("day").format();

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
