import { GAS_MARGIN_MULTIPLIER } from "@config/constants";
import BigNumber from "bignumber.js";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const calculateGasMargin = (value: any) => {
  return new BigNumber(value.toString())
    .multipliedBy(GAS_MARGIN_MULTIPLIER)
    .decimalPlaces(0)
    .toString();
};

export const convertFromUnits = (value: any, decimals = 18) => {
  return new BigNumber(value.toString()).dividedBy(Math.pow(10, decimals));
};

export const convertToUnits = (value: any, decimals = 18) => {
  return new BigNumber(value.toString())
    .multipliedBy(Math.pow(10, decimals))
    .decimalPlaces(0);
};

export const isGreater = (a: any, b: any) => {
  try {
    const bigA = new BigNumber(a.toString());
    const bigB = new BigNumber(b.toString());

    return bigA.isGreaterThan(bigB);
  } catch (error) {
    console.error(error);
  }

  return false;
};

export const isGreaterOrEqual = (a: any, b: any) => {
  try {
    const bigA = new BigNumber(a.toString());
    const bigB = new BigNumber(b.toString());

    return bigA.isGreaterThanOrEqualTo(bigB);
  } catch (error) {
    console.error(error);
  }

  return false;
};

export const isLessThan = (a: any, b: any) => {
  try {
    const bigA = new BigNumber(a.toString());
    const bigB = new BigNumber(b.toString());

    return bigA.isLessThan(bigB);
  } catch (error) {
    console.error(error);
  }

  return false;
};

export const isLessOrEqual = (a: any, b: any) => {
  try {
    const bigA = new BigNumber(a.toString());
    const bigB = new BigNumber(b.toString());

    return bigA.isLessThanOrEqualTo(bigB);
  } catch (error) {
    console.error(error);
  }

  return false;
};

export const isValidNumber = (x: any) => {
  if (BigNumber.isBigNumber(x)) {
    return true;
  }

  if (isNaN(x)) {
    return false;
  }

  const y = new BigNumber(x);
  return BigNumber.isBigNumber(y);
};
