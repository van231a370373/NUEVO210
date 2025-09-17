export function detectLang(req, res, next) {
  req.lang = req.headers['accept-language']?.split(',')[0]?.substring(0,2) || 'pl';
  next();
}
