const processLocalStorage = (action, key, value) => {
  if (action === "set") {
    localStorage.setItem(key, value);
  }

  if (action === "get") {
    const token = localStorage.getItem(key);

    if (!token) {
      return;
    } else {
      return token;
    }
  }

  if (action === "remove") {
    const removeToken = localStorage.removeItem(key);
  }
};
export default processLocalStorage;
