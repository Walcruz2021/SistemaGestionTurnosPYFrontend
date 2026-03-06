const convertArraySalesByYear = (salesXAnio) => {

  const fechaN = {
    name: 2025, // 2022
    meses: [
      {
        mesString: "Enero",
        mes: 1,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Febrero",
        mes: 2,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Marzo",
        mes: 3,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Abril",
        mes: 4,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Mayo",
        mes: 5,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Junio",
        mes: 6,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Julio",
        mes: 7,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Agosto",
        mes: 8,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Septiembre",
        mes: 9,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Octubre",
        mes: 10,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Noviembre",
        mes: 11,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Diciembre",
        mes: 12,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
    ],
  };

  salesXAnio.forEach((vta) => {
  const date = new Date(vta.date);

  const month = vta.month-1 // 🔥 SIN +1

  if (fechaN.meses[month]) {
    fechaN.meses[month].sumaMes += vta.totalSale || 0;
    fechaN.meses[month].sumaEfectivo += vta.paymentMethodEfectivo || 0;
    fechaN.meses[month].sumaTarjeta += vta.paymentMethodTarjeta || 0;
    fechaN.meses[month].sumaTransferencia += vta.paymentMethodTransferencia || 0;
  } 
});

  //hasta aqui se tendra el objecto fechaN con las sumas de todas las ventas por mes en (efectivo-tarjeta-transferencia)

  const arrayVtas = {
    meses: [],
    sumas: []
  }

  if (fechaN.meses) {
    var sumaTotalAnio = 0;
    var efectivoTotalAnio = 0;
    var tarjetaTotalAnio = 0;
    var bcoTotalAnio = 0;
    fechaN.meses.map((valor) => {
      if (valor.sumaMes != 0) {

        arrayVtas.meses.push(valor);
        sumaTotalAnio = sumaTotalAnio + valor.sumaMes;
        efectivoTotalAnio = efectivoTotalAnio + valor.sumaEfectivo;
        bcoTotalAnio = bcoTotalAnio + valor.sumaTransferencia;
        tarjetaTotalAnio = tarjetaTotalAnio + valor.sumaTarjeta;
      }
    });
    arrayVtas.sumas.push({ anio: fechaN.name });
    arrayVtas.sumas.push({ sumaTotalAnio: sumaTotalAnio });
    arrayVtas.sumas.push({ efectivoTotalAnio: efectivoTotalAnio });
    arrayVtas.sumas.push({ tarjetaTotalAnio: tarjetaTotalAnio });
    arrayVtas.sumas.push({ bcoTotalAnio: bcoTotalAnio });
  }

  return arrayVtas;
}

export default convertArraySalesByYear