/**
 * This function runs backend's array and according to the month, add their values  
 * @param {*} listadoValues Object Array - backend's GastosXAnio 
 * @returns Object Array with total sums Mes, trasnf, efect y tarjeta meses: [
       [ {
          mesString: "Enero",
          mes: 1,
          sumaMes: 20000,
          sumaEfectivo: 10000,
          sumaTarjeta: 0,
          sumaTransferencia: 10000,
        },...
        ]
 */

export default function filterSumaValues(listadoValues) {
  const objectListMeses = {
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
  if (listadoValues) {
    listadoValues.map((obj) => {
      const mes = obj.mes - 1; //es -1 poirque mes sera el indice en el array de meses
      //es decir mayo sera 4 en el array de meses
      //console.log(mes,"mes en curso")

      if (objectListMeses.meses[mes]) {
        if ("value" in obj) {
          objectListMeses.meses[mes].sumaMes =
            objectListMeses.meses[mes].sumaMes + obj.value;
        
        } else if ("valorServ" in obj) {
          objectListMeses.meses[mes].sumaMes =
            objectListMeses.meses[mes].sumaMes + obj.valorServ;
        }
        //console.log(objectListMeses.meses[mes].sumaMes,mes,"suma Mes Curso")
      }

      if (obj.efectivo) {
        if (objectListMeses.meses[mes]) {
          objectListMeses.meses[mes].sumaEfectivo =
            objectListMeses.meses[mes].sumaEfectivo + obj.efectivo;
        }
      }
      if (obj.tarjeta) {
        if (objectListMeses.meses[mes]) {
          objectListMeses.meses[mes].sumaTarjeta =
            objectListMeses.meses[mes].sumaTarjeta + obj.tarjeta;
        }
      }

      if (obj.transferencia) {
        if (objectListMeses.meses[mes]) {
          objectListMeses.meses[mes].sumaTransferencia =
            objectListMeses.meses[mes].sumaTransferencia + obj.transferencia;
        }
      }
    });
  }
  return objectListMeses.meses
}
