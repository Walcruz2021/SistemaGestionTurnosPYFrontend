const ventasMens=[
{
Dog: "628ae687d66d1f4760a02330",
client: "6287c8a0da18314e74b9325a",
date: "2022-02-02",
año:2022,
mes:02,
efectivo: 2000,
tarjeta:3000,
idTurno: "62b7a6854a736a55b8057ab9",
name: "Malachi Hahn",
notesTurn: "llega tarde",
tipoServ: "pago todo",
valorServ: 5000,
_id: "62b7a6944a736a55b8057abe"
},
{
    Dog: "628ae687d66d1f4760a02330",
client: "6287c8a0da18314e74b9325a",
date: "2022-02-01",
año:2022,
mes:02,
efectivo: 1000,
tarjeta:2000,
idTurno: "62b7a6854a736a55b8057ab9",
name: "Malachi Hahn",
notesTurn: "llega tarde",
tipoServ: "pago todo",
valorServ: 3000,
_id: "62b7a6944a736a55b8057abe"
},
{
Dog: "628ae687d66d1f4760a02330",
client: "6287c8a0da18314e74b9325a",
date: "2022-04-01",
año:2022,
mes:04,
efectivo: 3000,
tarjeta:3000,
idTurno: "62b7a6854a736a55b8057ab9",
name: "Malachi Hahn",
notesTurn: "llega tarde",
tipoServ: "pago todo",
valorServ: 6000,
_id: "62b7a6944a736a55b8057abe"
}

]

let tam = 0;
  const arrayAños = [2022];
  const ventasMensCopia = [];
  let sumaMes = [];
  let meses = 0;
  
  //funcion que se encargara de insertar objeto FECHA al array de INFORME
  function insertDate(anio){
    let fechaN = {
      name: anio, //2022
      meses: [
        { mes: "Enero", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Febrero", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Marzo", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Abril", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Mayo", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Junio", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Julio", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Agosto", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Septiembre", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Octubre", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Noviembre", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
        { mes: "Diciembre", sumaMes: 0, sumaEfectivo: 0 ,sumaTarjeta:0},
      ],
    }; 
    return fechaN 
  }

  ventasMens.map((vent) => {

        const fecha = new Date(vent.date); 
        // console.log(fecha)
        const año = fecha.getFullYear();
        console.log(año)
        const mes = fecha.getMonth()-1; 
        console.log(mes)
        //const año=vent.año
        //const mes=vent.mes-1
        if(ventasMensCopia.length===0){
      
          const date=insertDate(año)
          //console.log(date,"--->")
          if (date) {
            
            date.meses[mes].sumaMes =
            date.meses[mes].sumaMes + vent.valorServ;
            date.meses[mes].sumaEfectivo =
            date.meses[mes].sumaEfectivo + vent.efectivo;
            date.meses[mes].sumaTarjeta =
            date.meses[mes].sumaTarjeta + vent.tarjeta;
            ventasMensCopia.push(date);
            console.log(ventasMensCopia,"date")
          } else console.log("no hay mes");
        } else{
          if (año > arrayAños[tam]) {
            arrayAños.push(año); //[2021,2022]
            tam = tam + 1;
            let fechaN = {
              name: año, //2022
              meses: [
                { mes: "Enero", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Febrero", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Marzo", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Abril", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Mayo", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Junio", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Julio", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Agosto", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Septiembre", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Octubre", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Noviembre", sumaMes: 0, sumaEfectivo: 0 },
                { mes: "Diciembre", sumaMes: 0, sumaEfectivo: 0 },
              ],
            };
            if (mes) {
              fechaN.meses[mes].sumaMes = fechaN.meses[mes].sumaMes + vent.valorServ;
              fechaN.meses[mes].sumaEfectivo =fechaN.meses[mes].sumaEfectivo + vent.efectivo;
            console.log(fechaN,"dddd")
            } else {
              console("no hay mes")
              }
           
            ventasMensCopia.push(fechaN);
           
          } else {
    
            //se ingresa aqui cuando por lo menos ya hay un elemento en ventasMensCopia
            
            if (mes) {  
              console.log(vent.tarjeta)  
    
                ventasMensCopia[tam].meses[mes].sumaMes =
                ventasMensCopia[tam].meses[mes].sumaMes + vent.valorServ;
                
                  ventasMensCopia[tam].meses[mes].sumaEfectivo =
                  ventasMensCopia[tam].meses[mes].sumaEfectivo + parseInt(vent.efectivo);
                
                  ventasMensCopia[tam].meses[mes].sumaTarjeta =
                  ventasMensCopia[tam].meses[mes].sumaTarjeta + vent.tarjeta;
                
                console.log(ventasMensCopia[tam].meses[mes].sumaTarjeta)
              
            } else console.log("no hay mes");
      
          
          }
        }
      });

console.log(ventasMensCopia)