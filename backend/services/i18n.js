import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = {};
for (const lang of ['pl', 'es', 'en']) {
  locales[lang] = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../i18n/' + lang + '.json')));
}

export function t(key, lang = 'pl', params = {}) {
  let str = locales[lang][key] || locales['en'][key] || key;
  for (const p in params) {
    str = str.replace(`{${p}}`, params[p]);
  }
  return str;
}
