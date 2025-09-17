export function renderLanguageSelector(currentLang, onChange) {
  const langs = [
    { code: 'pl', label: 'Polski' },
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ];
  const select = document.createElement('select');
  select.className = 'form-select form-select-sm';
  langs.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.code;
    opt.textContent = l.label;
    if (l.code === currentLang) opt.selected = true;
    select.appendChild(opt);
  });
  select.onchange = e => onChange(e.target.value);
  return select;
}
