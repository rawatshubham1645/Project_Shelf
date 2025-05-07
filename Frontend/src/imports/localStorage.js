export const reduxLocalStorage = "persistStore";

export const getToken = () => {
  const serialState = localStorage.getItem(reduxLocalStorage);
  const token = JSON.parse(serialState)?.user?.token??null
  return token;
};
