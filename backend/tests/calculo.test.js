import { calcularGravamen, calcularImputacionRenta, calcularAlquiler, calcularTransmision } from '../services/calculoFiscal.js';

test('calcular gravamen UE', () => {
  expect(calcularGravamen(1000, true)).toBeCloseTo(190);
});

test('calcular gravamen no UE', () => {
  expect(calcularGravamen(1000, false)).toBeCloseTo(240);
});

test('calcular imputación renta', () => {
  expect(calcularImputacionRenta(100000, 365, 0.015)).toBeCloseTo(1500);
});

test('calcular alquiler UE', () => {
  expect(calcularAlquiler(5000, 1000, true)).toBeCloseTo(4000);
});

test('calcular transmisión', () => {
  expect(calcularTransmision(100000, 120000, 5000)).toBeCloseTo(15000);
});
