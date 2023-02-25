import React, { useState, createContext, useContext, useMemo } from 'react';

import { languageOptions, dictionaryList } from '../components/languages/index.js';

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: 'enUS',
  dictionary: dictionaryList.enUS
});

// it provides the language context to app
export function LanguageProvider({ children }) {
  const defaultLanguage = window.localStorage.getItem('rcml-lang');
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'enUS');

  // rewrite provider to use memoization
  const provider = useMemo(() => ({ userLanguage, dictionary: dictionaryList[userLanguage],
    userLanguageChange: selected => {
      const newLanguage = languageOptions[selected] ? selected : 'enUS'
      setUserLanguage(newLanguage);
      window.localStorage.setItem('rcml-lang', newLanguage);
    }
  }), [userLanguage]);

  // const provider = {
  //   userLanguage,
  //   dictionary: dictionaryList[userLanguage],
  //   userLanguageChange: selected => {
  //     const newLanguage = languageOptions[selected] ? selected : 'enUS'
  //     setUserLanguage(newLanguage);
  //     window.localStorage.setItem('rcml-lang', newLanguage);
  //   }
  // };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};

// get text according to ID & current language
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary[tid] || tid;
};