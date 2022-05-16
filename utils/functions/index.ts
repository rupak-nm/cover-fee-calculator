export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const truncateAddress = (addr: string) => {
  return addr.substring(0, 4) + "...." + addr.slice(-4);
};

export const isEmptyVariable = (...vars: any[]) => {
  for (let v of vars) {
    if (typeof v === "undefined" || v === "" || v === false) return true;
  }
  return false;
};

export const arrayIncludes = (
  arr: Array<any>,
  obj: any,
  key: string = "name"
) => {
  return arr
    .reduce((p, c) => {
      p.push(c[key]);
      return p;
    }, [])
    .includes(obj[key]);
};

export const allNullItemsArray = (arr: any[]) => {
  for (let v of arr) {
    if (typeof v === "number" || (typeof v === "string" && v !== ""))
      return false;
  }
  return true;
};

export const getErrorMessage = (_error: any) => {
  try {
    let error = _error.error || _error;
    if (!error || !error.message) {
      return "Unexpected Error Occured";
    }

    if (error?.data?.message) {
      return error.data.message.trim().replace("execution reverted: ", "");
    } else if (error?.data?.originalError?.message) {
      return error.data.originalError.message
        .trim()
        .replace("execution reverted: ", "");
    }

    return error.message.trim().replace("MetaMask Tx Signature: ", "");
  } catch (err) {
    return "Something went wrong";
  }
};
