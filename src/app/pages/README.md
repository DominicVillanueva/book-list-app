# NOTAS DE LOS TEST

## Callfake

Sirve para llamar a un metodo espiado y sustituir por un nuevo valor, también anula todo comportamiento del metodo.

```typescript
const spy = spyOn(service, 'updateAmountBook').and.callFake(() => null);
```

## CallThrough

Sirve para llamar a un metodo espiado y ejecutar ese metodo.

```typescript
const spy = spyOn((component as any), '_clearListCartBook').and.callThrough();
```

## fit y fdescribe

Enfoca o prioriza solo una prueba unitaria de los demás.

## xit y xdescribe

Desactiva temporalmente las pruebas unitarias del coverage, se utiliza para descartar pruebas unitarias que se encuentran fallando.

## beforeEach

Función que se ejecuta antes de las pruebas unitarias.

## beforeAll

Solo se ejecuta al principio de todo y mantiene solo una llamada en todo las UT.

## afterEach

Función que se ejecuta despúes de cada test

## afterAll

Función que se ejecuta despúes que termino todo los test
