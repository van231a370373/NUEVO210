import pl from './pl.json';
import es from './es.json';
import en from './en.json';

const locales = { pl, es, en };

export function t(key, lang = 'pl') {
  return locales[lang][key] || locales['en'][key] || key;
}

export function getAvailableLanguages() {
  return [
    { code: 'pl', label: 'Polski' },
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ];
}
