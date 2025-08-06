export const getDate = (date: Date) => {
  const getDay = new Date(date).getDate().toString().padStart(2, "0");
  const getMonth = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
  const getYear = new Date(date).getFullYear();

  return `${getDay}/${getMonth}/${getYear}`;
};
