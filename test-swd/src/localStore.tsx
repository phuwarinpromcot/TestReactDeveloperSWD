export const setLocalStorage = (key: string, values: string) => {
  window.localStorage.setItem(key, values);
  return "store successfully";
};

export const getLocalStorage = (key: string) => {
  return window.localStorage.getItem(`${key}`);
};
