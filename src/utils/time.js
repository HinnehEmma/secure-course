function getFormattedDate() {
  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);

  return formattedDate.replace(/(\d+),(,? \d{4})/, "$1,$2");
}

export { getFormattedDate };
