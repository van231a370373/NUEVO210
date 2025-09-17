import { t } from '../services/i18n.js';

export function requireFields(fields) {
  return (req, res, next) => {
    for (const field of fields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        return res.status(400).json({ error: t('error_required', req.lang, { field }) });
      }
    }
    next();
  };
}
