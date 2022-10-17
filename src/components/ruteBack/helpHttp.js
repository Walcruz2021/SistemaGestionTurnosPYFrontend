//import { Options } from "../../cssSyleComp/Table";

const helHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "aplication/json",
    };

    //puede seer que el servidor este caido por alguna razon
    //en este caso al no detectar una respuesta del servidor se aboirtara la peticion
    const controller = new AbortController();
    options.signal = controller.signal;
    options.method = options.method || "GET";
    options.header = options.headers
      ? { ...defaultHeader, ...options.header }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;
    console.log(options);
    //con esto abortamos
    setTimeout(() => controller.abort(), 3000);

    // let fetchErr={
    //     err:true,
    //     status:res.status||"00",
    //     statusText:res.statusText||"Ocurrio Error"
    // }
    return  fetch(endpoint,options)
    .then((res)=>
        res.ok
        ?res.json()
        :Promise.reject({
          err:true,
          status:res.status||"00",
          statusText:res.statusText||"Ocurrio Error"
        })
    )
    .catch((err)=>err)
    };

  const get = (url,options={}) => customFetch(url,options);

  return {
    get,
  };
};

export default helHttp