import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en.json';
import es from './translations/es.json';

const resources = {
  en,
  es,
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  defaultNS: 'common',
  fallbackLng: 'en',
});

export const availableLanguages = Object.keys(resources);
