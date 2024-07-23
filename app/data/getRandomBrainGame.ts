import { Post } from "../types/post/types";

const getRandomBrainGame = async (): Promise<Post> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/brain-games?status=publish&_embed=true`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  const games = await response.json();

  return games[Math.floor(Math.random() * games.length)];
};

export default getRandomBrainGame;
