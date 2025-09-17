// Motor de cálculo fiscal IRNR

export function calcularGravamen(base, residenciaUE) {
  const tasa = residenciaUE ? 0.19 : 0.24;
  return base * tasa;
}

export function calcularImputacionRenta(valorCatastral, diasTitularidad, coeficiente) {
  return (valorCatastral * coeficiente * diasTitularidad) / 365;
}

export function calcularAlquiler(ingresos, gastos, residenciaUE) {
  const gastosDeducibles = residenciaUE ? gastos : 0;
  return ingresos - gastosDeducibles;
}

export function calcularTransmision(valorAdq, valorTrans, gastos) {
  return (valorTrans - valorAdq - gastos);
}
