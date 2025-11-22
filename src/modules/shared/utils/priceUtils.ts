export const exchangeRates: Record<string, number> = {
  en: 0.75,
  fi: 1,
  pl: 4,
  uk: 45,
};

const currencyCodes: Record<string, string> = {
  en: "GBP",
  fi: "EUR",
  pl: "PLN",
  uk: "UAH",
};

export const formatPrice = (localPrice: number, lang: string) => {
  const currency = currencyCodes[lang];

  const formatted = new Intl.NumberFormat(lang, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(localPrice);

  return formatted;
};

export const formatWithRate = (price: number, lang: string) => {
  const rate = exchangeRates[lang];

  return formatPrice(price * rate, lang);
};
