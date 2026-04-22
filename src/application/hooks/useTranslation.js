import { supportedLanguages, translations } from '../../domain/content';
import { useLocalStorageState } from './useLocalStorageState';

export function useTranslation() {
  const [language, setLanguage] = useLocalStorageState('language', 'en');
  const dictionary = translations[language] || translations.en;

  const t = (key) => dictionary[key] || translations.en[key] || key;
  const text = (localizedValue) => {
    if (!localizedValue || typeof localizedValue !== 'object') {
      return localizedValue || '';
    }

    return localizedValue[language] || localizedValue.en || '';
  };

  return {
    language,
    languages: supportedLanguages,
    setLanguage,
    t,
    text,
  };
}
