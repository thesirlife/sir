const resetPassword = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/users/reset-password?email=${email}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};

export default resetPassword;
