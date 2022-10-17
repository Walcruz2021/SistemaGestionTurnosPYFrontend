const fecha1 = {
  name: 2022, // 2022
  meses: [
    { mes: 0, sumaMes: 0 },
    { mes: 1, sumaMes: 0 },
    { mes: 2, sumaMes: 0 },
    { mes: 3, sumaMes: 0 },
    { mes: 4, sumaMes: 0 },
    { mes: 5, sumaMes: 0 },
    { mes: 6, sumaMes: 0 },
    { mes: 7, sumaMes: 0 },
    { mes: 8, sumaMes: 0 },
    { mes: 9, sumaMes: 0 },
    { mes: 10, sumaMes: 0 },
    { mes: 11, sumaMes: 0 }
  ]
}
const fecha2 = {
  name: 2023, // 2022
  meses: [
    { mes: 0, sumaMes: 0 },
    { mes: 1, sumaMes: 0 },
    { mes: 2, sumaMes: 4741 },
    { mes: 3, sumaMes: 0 },
    { mes: 4, sumaMes: 547 },
    { mes: 5, sumaMes: 0 },
    { mes: 6, sumaMes: 0 },
    { mes: 7, sumaMes: 1255 },
    { mes: 8, sumaMes: 0 },
    { mes: 9, sumaMes: 245 },
    { mes: 10, sumaMes: 0 },
    { mes: 11, sumaMes: 575 }
  ]
}

const arrayVentas = [
  {
    _id: '62b64e05abde7c1c0883f17c',
    idTurno: '62b64deeabde7c1c0883f177',
    date: '2022-05-21',
    valorServ: 6000,
    name: 'Malachi Hahn',
    notesTurn: 'llega en auto',
    tipoServ: 'corte cuchilla 25-25',
    efectivo: 600,
    tarjeta: 5400,
    client: '6287c8a0da18314e74b9325a',
    Dog: '628ae644d66d1f4760a02319',
    año: 2022,
    mes: 4
  },
  {
    _id: '62b7a6944a736a55b8057abe',
    idTurno: '62b7a6854a736a55b8057ab9',
    date: '2021-02-01',
    valorServ: 2000,
    name: 'Malachi Hahn',
    notesTurn: 'llega tarde',
    tipoServ: 'pago todo',
    efectivo: 2000,
    client: '6287c8a0da18314e74b9325a',
    Dog: '628ae687d66d1f4760a02330',
    __v: 0,
    año: 2022,
    mes: 1
  },
  {
    _id: '62b8eda5aa4e1145185d66d0',
    idTurno: '62b8bbdca322e62dd452873e',
    date: '2022-06-29',
    valorServ: 2500,
    name: 'lourdes ',
    notesTurn: 'llega tarde',
    tipoServ: 'cuchilla 7',
    efectivo: 1000,
    tarjeta: 1500,
    mes: 5,
    client: '6284e49cd618910a4cb259f8',
    Dog: '62852516cc08e9375cfd6b11',
    __v: 0,
    año: 2022
  },
  {
    _id: '62b8ee33aa4e1145185d66ee',
    idTurno: '62b8ee1daa4e1145185d66e9',
    date: '2022-07-20',
    valorServ: 3000,
    name: 'Malachi Hahn',
    notesTurn: 'llega en auto',
    tipoServ: 'cuhcilla 87',
    transferencia: '1000',
    efectivo: 1000,
    tarjeta: 1000,
    mes: 6,
    client: '6287c8a0da18314e74b9325a',
    Dog: '628ae644d66d1f4760a02319',
    __v: 0,
    año: 2022
  },
  {
    _id: '62b8f01d9298755cb8a89a39',
    idTurno: '62b8f0049298755cb8a89a34',
    date: '2022-06-15',
    valorServ: 2540,
    name: 'Malachi Hahn',
    notesTurn: 'llega en camioneta',
    tipoServ: 'corte y baño',
    transferencia: '540',
    efectivo: 2000,
    año: 2022,
    mes: 5,
    client: '6287c8a0da18314e74b9325a',
    Dog: '628ae687d66d1f4760a02330',
    __v: 0
  },
  {
    _id: '62b8fa987b4105328c64f32f',
    idTurno: '62b8fa7c7b4105328c64f32a',
    date: '2022-03-16',
    valorServ: 4500,
    name: 'Alison Cruickshank',
    notesTurn: 'llega puntual',
    tipoServ: 'corte al ras',
    transferencia: '2000',
    efectivo: 1000,
    tarjeta: 1500,
    año: 2022,
    mes: 2,
    client: '6287d6e6dececd34f0ff9320',
    Dog: '628ad0c4d66d1f4760a02166',
    __v: 0
  }
]

arrayVentas.map((vta) => {
  console.log(vta)
})

const arrayFechas = []
arrayFechas.push(fecha1)
arrayFechas.push(fecha2)

const objeto = {
  name: '',
  mesesObj: []
}

const arrayRend = []

const filtered1 = arrayFechas.map(venta => {
  // venta.meses.filter(v=>{
  //   return v.sumaMes!=0
  // })
  // return venta
  arrayRend.push(venta.name)
  const filtered2 = venta.meses.filter(function (element) {
    return element.sumaMes > 0
  })
  console.log(filtered2, 'lll')
  arrayRend.push(filtered2)
})

console.log(arrayRend, 'dssd')

const par = function (num) {
  if (num == 0 || num % 2 == 0) {
    return 1
  } else return 0
}

console.log(par(0))
//
// [
// 2022,
//   [ { mes: 0, sumaMes: 215 },
//     { mes: 4, sumaMes: 2546 },
//     { mes: 7, sumaMes: 1255 }
//   ],
// 2023,
//   [ { mes: 2, sumaMes: 4741 },
//     { mes: 4, sumaMes: 547 },
//     { mes: 7, sumaMes: 1255 },
//     { mes: 9, sumaMes: 245 },
//     { mes: 11, sumaMes: 575 }
//   ],
// ]

let c = 0
arrayRend.map((vent) => {
  if (par(c) == 1) {
    console.log(vent, 'año')
  } else {
    vent.forEach((vent2) => {
      console.log(vent2.mes, 'mes')
      console.log(vent2.sumaMes, 'monto')
    })
  }
  c = c + 1
})

// arrayRend.forEach(venta=>{
//     console.log(venta,"xxx")
//     venta.forEach(v=>{
//       console.log(v)
//     })
// })
