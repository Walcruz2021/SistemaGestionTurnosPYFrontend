export default function sumaTotalesArraySale(listadoValues) {

  const objectSumaTotales = {
    sumaMes: 0,
    sumaEfectivo: 0,
    sumaTarjeta: 0,
    sumaTransferencia: 0,
  };
  listadoValues.forEach((item) => {

    objectSumaTotales.sumaMes += item.totalSale || 0;
    objectSumaTotales.sumaEfectivo += item.paymentMethodEfectivo
 || 0;
    objectSumaTotales.sumaTarjeta += item.paymentMethodTarjeta || 0;
    objectSumaTotales.sumaTransferencia += item.paymentMethodTransferencia
 || 0;
  });

  return objectSumaTotales;
}