import {
  fromUnixTime,
  getUnixTime,
  differenceInDays,
  endOfDay,
  getDate,
  addMonths,
  endOfMonth,
} from "date-fns";

// CONSTANTS
const DAYS = 24 * 60 * 60;
const COVERAGE_LAG = 1 * DAYS;
const MULTIPLIER = 10_000;
const INCIDENT_SUPPORT_POOL_CAP_RATIO = 2500;

const getBlockTimestamp = () => getUnixTime(new Date());

const formatPercent = (x: number) => {
  if (isNaN(x)) {
    return "";
  }

  const percent = x * 100;

  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: percent < 1 ? 6 : 3,
  }).format(x);
};

const asCurrency = (
  sign: string,
  number: number,
  symbol: string,
  currency: string,
  token = false
) => {
  if (token) {
    if (number < 0.00000001) {
      return "A fraction of " + currency;
    }

    if (parseFloat(number.toString()) < 0.01) {
      number = parseFloat(number.toFixed(8));
    }

    return `${sign}${number.toLocaleString("en-US")}${symbol} ${currency}`;
  }

  let maximumFractionDigits = parseFloat(number.toString()) < 1 ? 8 : 3;

  if (parseFloat(number.toString()) > 1000) {
    maximumFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });

  return `${sign}${formatter.format(number)}${symbol}`;
};

const formatCurrency = (input: number, currency = "USD", token = false) => {
  const number = parseFloat(Math.abs(input).toString());

  if (!number) {
    return { short: "N/A", long: "Not available" };
  }

  const sign = input < 0 ? "-" : "";

  let result = number;
  let symbol = "";

  if (number > 1e4 && number < 1e5) {
    result = parseFloat(number.toFixed(2));
  }

  if (number >= 1e5 && number < 1e6) {
    symbol = "K";
    result = +(number / 1e3).toFixed(2);
  }

  if (number >= 1e6 && number < 1e9) {
    symbol = "M";
    result = +(number / 1e6).toFixed(2);
  }

  if (number >= 1e9 && number < 1e12) {
    symbol = "B";
    result = +(number / 1e9).toFixed(2);
  }

  if (number >= 1e12) {
    symbol = "T";
    result = +(number / 1e12).toFixed(2);
  }

  return {
    short: asCurrency(sign, result, symbol, currency, token),
    long: asCurrency(sign, number, "", currency, token),
  };
};

const getExpiryDate = (blockTimestamp: number, coverDuration: number) => {
  const day = getDate(fromUnixTime(blockTimestamp));

  let monthToAdd = coverDuration - 1;

  if (day >= 25) {
    // Add one month
    monthToAdd += 1;
  }

  const date = addMonths(fromUnixTime(blockTimestamp), monthToAdd);

  return endOfMonth(date);
};

const getTotalAvailableLiquidity = ({
  inVault,
  reassuranceAmount,
}: {
  reassuranceAmount: number;
  inVault: number;
}) => {
  const reassuranceFund =
    (reassuranceAmount * INCIDENT_SUPPORT_POOL_CAP_RATIO) / MULTIPLIER;

  const totalAvailableLiquidity = inVault + reassuranceFund;
  return totalAvailableLiquidity;
};

const getCoverFee = (data: any) => {
  data.reassuranceFund =
    (data.reassuranceAmount * INCIDENT_SUPPORT_POOL_CAP_RATIO) / MULTIPLIER;

  data.totalAvailableLiquidity = getTotalAvailableLiquidity({
    inVault: data.inVault,
    reassuranceAmount: data.reassuranceAmount,
  });

  if (data.totalCommitment + data.amount > data.totalAvailableLiquidity) {
    throw new Error("Balance insufficient");
  }

  data.utilizationRatio =
    (data.totalCommitment + data.amount) / data.totalAvailableLiquidity;

  let rate =
    data.utilizationRatio > data.floor ? data.utilizationRatio : data.floor;

  rate = (rate * MULTIPLIER + data.duration * 100) / MULTIPLIER;

  if (rate > data.ceiling) {
    rate = data.ceiling;
  }

  data.rate = rate;

  const blockTimestamp = getBlockTimestamp();
  const expiryDate = getExpiryDate(blockTimestamp, data.duration);
  const effectiveFrom = endOfDay(fromUnixTime(blockTimestamp + COVERAGE_LAG));
  const daysCovered = differenceInDays(expiryDate, effectiveFrom);

  data.projectedFee = (data.rate * data.amount * daysCovered) / 365;

  return data;
};

const getRangeX = (inVault: number, reassuranceAmount: number) => {
  const range = [
    1, 5, 10, 15, 20, 50, 100, 150, 200, 500, 1000, 1500, 2000, 5000, 10_000,
  ];
  let max = getTotalAvailableLiquidity({ inVault, reassuranceAmount });

  let current = 10_000;
  let factor = 10_000;
  let i = 1;
  while (current < max) {
    if (i % 100 == 0) {
      factor = factor * 10;
    }

    current += factor;
    range.push(current);

    i++;
  }

  return range;
};

export {
  formatPercent,
  formatCurrency,
  getCoverFee,
  getTotalAvailableLiquidity,
  getRangeX,
};
