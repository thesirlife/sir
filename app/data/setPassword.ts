const setPassword = async (email: string, password: string, code: string) => {
  const params = new URLSearchParams({
    email,
    password,
    code,
  });

  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/users/set-password?${params}`,
    {
      method: "POST",
    }
  );
  const data = await reponse.json();

  return data;
};

export default setPassword;
