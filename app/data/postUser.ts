type PostUserProps = {
  username: string;
  email: string;
  password: string;
};

export const postUser = async ({
  username,
  email,
  password,
}: PostUserProps) => {
  console.log(username);

  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/users?username=${username}&email=${email}&password=${password}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic c2lyZGV2OnJVU1MgYURLMCBCelk3IGx1Q00geDhNSyBhcEFa",
        },
      }
    );
    console.log(data.json);
    return await data.json();
  } catch {
    console.log("error");
  }
};
