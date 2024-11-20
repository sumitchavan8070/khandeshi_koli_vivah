import React, { createContext, useState, useEffect } from "react";
import TRANSLATIONS from "../constants/LanguageConstants";

export const LanguageContext = createContext({
  lang: "en",
  translations: TRANSLATIONS.en,
  setLang: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("mr");
  const [translations, setTranslations] = useState(TRANSLATIONS.en);

  useEffect(() => {
    setTranslations(TRANSLATIONS[lang] || TRANSLATIONS.en);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, translations, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
