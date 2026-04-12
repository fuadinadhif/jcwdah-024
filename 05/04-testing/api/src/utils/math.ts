export function add(num1: number, num2: number) {
  if (typeof num1 !== "number" || typeof num2 !== "number") return NaN;

  return num1 + num2;
}
