const array = [
  {
    _id: "628aceb6d66d1f4760a02135",
    nameP: "pulguersita",
    raza: "labrador",
    tamaño: "grande",
    notaP: "es mala",
  },
  {
    _id: "628acf8bd66d1f4760a0214e",
    nameP: "flaquiño",
    raza: "doberman",
    tamaño: "mediano",
    notaP: "es flaco",
  },
  { _id: "628ad0c4d66d1f4760a02166", 
  nameP: "pulgoso", 
  raza: "callejero" },
];

//IMPRIME EL INDICE DEL MAP

const vector= array.map((array,index)=>{
return console.log(index) 
})


