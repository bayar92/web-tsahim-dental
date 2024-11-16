import { reduce } from "lodash";

const mapCyrillic2Latin = [
  ["ЯА", "YA"],
  ["Яа", "Ya"],
  ["яа", "ya"],
  ["Я", "Ya"],
  ["я", "ya"],
  ["ЁО", "YO"],
  ["Ёо", "Yo"],
  ["ёо", "yo"],
  ["Ё", "Yo"],
  ["ё", "yo"],
  ["ЕЭ", "YE"],
  ["Еэ", "Ye"],
  ["еэ", "ye"],
  ["Е", "Ye"],
  ["е", "ye"],
  ["ЮУ", "Yu"],
  ["Юу", "Yu"],
  ["юу", "yu"],
  ["Ю", "Yu"],
  ["ю", "yu"],
  ["ЮҮ", "Yu"],
  ["Юү", "Yu"],
  ["юү", "yu"],
  ["Ю", "Yu"],
  ["ю", "yu"],
  ["Ь", "I"],
  ["ь", "i"],
  ["Ъ", "I"],
  ["ъ", "i"],
  ["Й", "i"],
  ["й", "i"],
  ["Ы", "ii"],
  ["ы", "ii"],
  ["Щ", "Shch"],
  ["щ", "shch"],
  ["Ш", "Sh"],
  ["ш", "sh"],
  ["Ч", "Ch"],
  ["ч", "ch"],
  ["Ц", "Ts"],
  ["ц", "ts"],
  ["Х", "Kh"],
  ["х", "kh"],
  ["Ж", "J"],
  ["ж", "j"],
  ["Ф", "F"],
  ["ф", "f"],
  ["К", "K"],
  ["к", "k"],
  ["З", "Z"],
  ["з", "z"],
  ["П", "P"],
  ["п", "p"],
  ["В", "V"],
  ["в", "v"],
  ["Р", "R"],
  ["р", "r"],
  ["С", "S"],
  ["с", "s"],
  ["Т", "T"],
  ["т", "t"],
  ["М", "M"],
  ["м", "m"],
  ["Н", "N"],
  ["н", "n"],
  ["Л", "L"],
  ["л", "l"],
  ["Г", "G"],
  ["г", "g"],
  ["Д", "D"],
  ["д", "d"],
  ["Б", "B"],
  ["б", "b"],
  ["Ү", "U"],
  ["ү", "u"],
  ["У", "U"],
  ["у", "u"],
  ["Ө", "U"],
  ["ө", "u"],
  ["О", "O"],
  ["о", "o"],
  ["И", "I"],
  ["и", "i"],
  ["Э", "E"],
  ["э", "e"],
  ["А", "A"],
  ["а", "a"],
];

export const convertCyrillic2Latin = (text: string) =>
  !text
    ? ""
    : reduce(mapCyrillic2Latin, (v, m) => v.replaceAll(m[0], m[1]), text);
export const currencyDisplayHandler = (
  amount: any,
  country: string
): string => {
  // Check if the amount is undefined or null and return $0.00
  if (amount === undefined || amount === null) return "$0.00";

  // Manually truncate to two decimal places
  const truncatedAmount = Math.floor(parseFloat(amount) * 100) / 100;
  const formattedAmount = truncatedAmount.toFixed(country == "mn" ? 0 : 2);

  // Format for Mongolia with the currency symbol and thousands separator
  if (country === "mn")
    return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";

  // Default formatting with dollar sign for other countries
  return "$" + formattedAmount;
};
