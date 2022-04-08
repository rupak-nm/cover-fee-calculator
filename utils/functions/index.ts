export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const truncateAddress = (addr: string) => {
  return addr.substring(0, 4) + "...." + addr.slice(-4);
};
