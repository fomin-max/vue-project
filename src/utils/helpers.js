export const isNumber = value =>
  !!(value !== "" && typeof Number(value) === "number");
