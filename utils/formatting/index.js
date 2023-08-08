export const getLocale = () => {
  const fallback = "en-US";

  try {
    return (
      navigator.userLanguage ||
      (navigator.languages &&
        navigator.languages.length &&
        navigator.languages[0]) ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.systemLanguage ||
      fallback
    );
  } catch {
    // `navigator` is not available
  }

  return fallback;
};

export const getNumberSeparators = (locale = "en") => {
  const thousand = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, "");
  const decimal = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, "");
  return {
    thousand,
    decimal,
  };
};

export const getPlainNumber = (formattedString, locale = "en") => {
  const sep = getNumberSeparators(locale);
  return formattedString
    .toString()
    .replaceAll(sep.thousand, "")
    .replace(sep.decimal, ".");
};

export const getLocaleNumber = (plainNumber, locale = "en") => {
  const sep = getNumberSeparators(locale);
  const formattedNumber = Intl.NumberFormat(locale, {}).format(plainNumber);
  return formattedNumber;
};

export const castToNumber = (obj = {}) => {
  const newObj = {};
  for (const key in obj) {
    const element = obj[key];
    newObj[key] = element !== "" ? parseFloat(element) : "";
  }

  return newObj;
};

export const isKeyEmpty = (obj = {}, keys = []) => {
  const res = false;
  keys.map((k) => {
    if (obj[k] === "") {
      res = true;
      return;
    }
  });
  return res;
};
