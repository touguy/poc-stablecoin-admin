export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 0-based
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

export function formatAmount(value: number | string): string {
  const num = Number(value);

  if (isNaN(num)) return "0";

  // 소수점 이하 불필요한 0 제거
  const trimmed = num % 1 === 0 ? num.toFixed(0) : num.toString();

  // 콤마 포매팅
  return trimmed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
