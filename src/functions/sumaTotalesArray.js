/**
 * This function runs backend's object with total values and sum them up
 * @param {*} listadoValues Object - backend's Sales 
 * @returns Object Array with total sums Mes, trasnf, efect y tarjeta meses: [
       {
          sumaMes: 20000,
          sumaEfectivo: 10000,
          sumaTarjeta: 0,
          sumaTransferencia: 10000,
        }
 */

export default function sumaTotalesArray(listadoValues) {
 
  const objectSumaTotales = {
    sumaMes: 0,
    sumaEfectivo: 0,
    sumaTarjeta: 0,
    sumaTransferencia: 0,
  };
  listadoValues.forEach((item) => {

    objectSumaTotales.sumaMes += item.valorServ || 0;
    objectSumaTotales.sumaEfectivo += item.efectivo || 0;
    objectSumaTotales.sumaTarjeta += item.tarjeta || 0;
    objectSumaTotales.sumaTransferencia += item.transferencia || 0;
  });

  return objectSumaTotales;
}