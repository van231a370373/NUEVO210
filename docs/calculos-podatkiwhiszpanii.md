# Motor de cálculo fiscal IRNR

## Reglas clave
- Agrupación de rentas solo en transmisiones (tipo 28).
- Imputación de renta (tipo 01) y alquileres (tipo 02): cada titular declara por referencia catastral y en su nombre (declaración individual).

## Pseudocódigo

```js
function calcularGravamen(base, tipo, residenciaUE) {
  let tasa = residenciaUE ? 0.19 : 0.24;
  return base * tasa;
}

function calcularImputacionRenta(valorCatastral, diasTitularidad, coeficiente) {
  return (valorCatastral * coeficiente * diasTitularidad) / 365;
}

function calcularAlquiler(ingresos, gastos, residenciaUE) {
  let gastosDeducibles = residenciaUE ? gastos : 0;
  return ingresos - gastosDeducibles;
}

function calcularTransmision(valorAdq, valorTrans, gastos) {
  return (valorTrans - valorAdq - gastos);
}
```

## Tests de caja negra

```js
assert(calcularGravamen(1000, 210, true) === 190);
assert(calcularAlquiler(5000, 1000, true) === 4000);
assert(calcularTransmision(100000, 120000, 5000) === 15000);
```
