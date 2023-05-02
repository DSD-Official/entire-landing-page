export const shortenAddress = (addr: string) => {
  if (!addr) return addr;
  return addr.slice(0, 4) + "..." + addr.slice(-4);
}