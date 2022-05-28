import i18n from 'i18next';
import translationEN from '../locales/en/translation';
import translationVI from '../locales/vi/translation';
// the translations
const resources = {
  en: {
      translation: translationEN
  },
  vi: {
      translation: translationVI
  }
};

i18n
  .init({
    resources,
    fallbackLng: 'vi',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;