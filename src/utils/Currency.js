export function formatTZS(amount) {
  return `TZS ${Math.round(amount).toLocaleString("en-US")}`;
}