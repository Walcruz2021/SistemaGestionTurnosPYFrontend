  
  
  //transforma date de yyyy/mm/dd a dd/mm/aaaaa
  function convertDateReverse(date) {
    let info = 0;
    if (date) {
      info = date.split("-").reverse().join("/");
    }
    return info;
  }


  export default convertDateReverse