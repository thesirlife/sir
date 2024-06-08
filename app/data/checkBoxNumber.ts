const checkBoxNumber = async (number: number): Promise<boolean> => {
  // we need to get all valid numbers from WP, and see if the number they entered matches

  try {
    const response = await fetch("", {});

    const data = await response.json();

    return true;
  } catch {
    return false;
  }
};

export default checkBoxNumber;
