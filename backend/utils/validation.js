export const isBlank = (value) => {
  return typeof value !== "string" || value.trim() === "";
};

export const isInvalidEmail = (value) => {
  if (isBlank(value)) return true;
  return !/^\S+@\S+\.\S+$/.test(value.trim());
};
