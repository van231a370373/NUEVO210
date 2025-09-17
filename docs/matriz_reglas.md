# Matriz de reglas actualizada

| Requisito | Regla | Campo | Prueba | Estado |
|-----------|-------|-------|--------|--------|
| Agrupación transmisiones | Solo transmisiones (tipo 28) | id_inmueble, id_titular, tipo_renta | Test agrupación solo tipo 28 | OK |
| Imputación/alquiler | Declaración individual por titular y referencia catastral | id_inmueble, id_titular, tipo_renta | Test con varios titulares, tipo 01/02 | OK |
