import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const getToken = () =>  localStorage.getItem("token");

  return { token, saveToken, removeToken, getToken };
};

export default useToken;
