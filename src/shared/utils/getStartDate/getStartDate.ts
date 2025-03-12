import dayjs from "dayjs";

export const getStartDate = () => {
  const today = dayjs();
  const dayOfWeek = today.day()

  switch (dayOfWeek) {
    case 0:
      return today.subtract(3, "days");
    case 1:
      return today.subtract(4, "days");
    default:
      return today.subtract(2, "days");
  }
}
