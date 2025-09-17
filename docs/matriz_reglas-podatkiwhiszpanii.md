# Matriz de reglas y validaciones

| Requisito legal | Regla de negocio | Campo | Prueba | Estado |
|-----------------|------------------|-------|--------|--------|
| Estructura Modelo 210 | Validar campos obligatorios, formatos y rangos | NIF, nombre, domicilio, valor catastral, fechas | Test unitario con JSON válido/erróneo | OK |
| Agrupación de rentas | Solo transmisiones (tipo 28) | id_inmueble, id_titular, tipo_renta | Test con varios titulares/inmuebles | OK |
| Imputación/alquiler | Declaración individual por titular y referencia catastral | id_titular, id_inmueble, tipo_renta | Test con copropiedad | OK |
| Gastos deducibles UE/EEE | Permitir deducción solo si país residencia en UE/EEE | país_residencia, gastos | Test con país ES/PL/DE/NO | OK |
| Prorrateo días titularidad | Calcular base imponible según días | fecha_inicio, fecha_fin | Test con periodos parciales | OK |
| Exenciones/bonificaciones | Aplicar si cumple plazos y condiciones | tipo_exención, fecha_adquisición | Test con fechas límite | OK |
| RGPD/LOPDGDD | Consentimiento, minimización, derecho acceso/borrado | usuario, logs, documentos | Test de flujo legal | OK |
