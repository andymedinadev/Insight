export function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
