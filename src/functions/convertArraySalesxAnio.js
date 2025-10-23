const convertArraySalesxAnio = (salesXAnio) => {

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

  salesXAnio.map((vta) => {
    const mes = vta.mes - 1; //es -1 poirque mes sera el indice en el array de meses
    //es decir mayo sera 4 en el array de meses
    //console.log(mes,"mes en curso")
    if (vta.valorServ) {
      if (fechaN.meses[mes]) {
        fechaN.meses[mes].sumaMes = fechaN.meses[mes].sumaMes + vta.valorServ;
        //console.log(fechaN.meses[mes].sumaMes,mes,"suma Mes Curso")
      }
    }

    if (vta.efectivo) {
      if (fechaN.meses[mes]) {
        fechaN.meses[mes].sumaEfectivo =
          fechaN.meses[mes].sumaEfectivo + vta.efectivo;
      }
    } //else fechaN.meses[mes].sumaEfectivo = fechaN.meses[mes].sumaEfectivo + 0;

    if (vta.tarjeta) {
      if (fechaN.meses[mes]) {
        fechaN.meses[mes].sumaTarjeta =
          fechaN.meses[mes].sumaTarjeta + vta.tarjeta;
      }
    } //else fechaN.meses[mes].sumaTarjeta = fechaN.meses[mes].sumaTarjeta + 0;

    if (vta.transferencia) {
      if (fechaN.meses[mes]) {
        fechaN.meses[mes].sumaTransferencia =
          fechaN.meses[mes].sumaTransferencia + vta.transferencia;
      }
    }
  });

  //hasta aqui se tendra el objecto fechaN con las sumas de todas las ventas por mes en (efectivo-tarjeta-transferencia)

  const arrayVtas = {
    meses:[],
    sumas:[]
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

export default convertArraySalesxAnio