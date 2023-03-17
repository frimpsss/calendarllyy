import dayjs from "dayjs";
export const genetate = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDayOfMonth = dayjs().year(year).month(month).endOf("month");

  let arrayofDates = [];

  // generates prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); ++i) {
    arrayofDates.push({ date: firstDateOfMonth.day(i), currentMonth: false });
  }

  // generates current dates
  for (let i = firstDateOfMonth.date(); i <= lastDayOfMonth.date(); ++i) {
    arrayofDates.push({
      date: firstDateOfMonth.date(i),
      currentMonth: true,
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    }); 
  }

  // remaining

  const remainingDays = 42 - arrayofDates.length;
  for (
    let i = lastDayOfMonth.date() + 1;
    i <= remainingDays + lastDayOfMonth.date();
    ++i
  ) {
    arrayofDates.push({ date: lastDayOfMonth.date(i), currentMonth: false });
  }
  return arrayofDates;
};

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
