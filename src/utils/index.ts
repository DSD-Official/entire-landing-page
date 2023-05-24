export const shortenAddress = (addr: string) => {
  if (!addr) return addr;
  return addr.slice(0, 4) + "..." + addr.slice(-4);
}

export const getDay = (timestamp: number) => {
  let ret = Math.floor(timestamp / 3600 / 24);
  return (ret < 10 ? "0" : "") + ret;
}

export const getHour = (timestamp: number) => {
  let ret = Math.floor(timestamp / 3600) % 24;
  return (ret < 10 ? "0" : "") + ret;
}

export const getMinute = (timestamp: number) => {
  let ret = Math.floor(timestamp / 60) % 60;
  return (ret < 10 ? "0" : "") + ret;
}

export const getSecond = (timestamp: number) => {
  let ret = Math.floor(timestamp % 60);
  return (ret < 10 ? "0" : "") + ret;
}
