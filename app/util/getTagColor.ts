export const getTagColor = (tag: string) => {
  switch (tag) {
    case "video":
      return "warning";
    default:
      return "info";
  }
};
