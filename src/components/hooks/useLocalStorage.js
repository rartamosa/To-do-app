import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [data, setData] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : initialValue
  );

  const update = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setData(newValue);
  };

  const clear = () => {
    localStorage.removeItem(key);
  };

  return [data, update, clear];
};

export default useLocalStorage;
