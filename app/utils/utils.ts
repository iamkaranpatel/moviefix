const currentYear = new Date().getFullYear();
const yearsArray = [];
for (let year = 2012; year <= currentYear; year++) {
    yearsArray.push(year);
}

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  return `${day}-${month}-${year}`;
};

export default yearsArray as number[];
