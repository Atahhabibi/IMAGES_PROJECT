import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const storedDarkMode = localStorage.getItem("darkTheme");

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === "true";
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());

  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme); 
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const value = {
    toggleDarkTheme,
    isDarkTheme,
    searchTerm,
    setSearchTerm
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
