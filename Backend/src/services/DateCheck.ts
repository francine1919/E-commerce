export function verifyExpDate(date: string) {
  const splitDate = date.split("/");
  const splitMonth = Number(splitDate[1]) + 1;
  const splitYear = Number(splitDate[2]);
  const splitDay = Number(splitDate[0]);
  const todaysDate = new Date();
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const todaysDay = todaysDate.getDate();
  console.log("today", todaysDay);
    console.log("month", todaysMonth);
  if (
    splitYear < todaysYear ||
    splitMonth < todaysMonth 
    // ||
    // splitDay < todaysDay
  ) {
    return false;
  }
  return true;
}
