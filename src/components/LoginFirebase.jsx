// import React, { useState, useEffect } from "react";
// import FormLoginNew from "./Formulario/FormLoginNew";
// import { auth } from "../hooks/configFirebase";

// /**
//  * This component work as filter. If exist user logued it show dashboard, if no exist user it show login component
//  * when access to main root ("/")
//  * @returns 
//  */
// const LoginFirebase = () => {
//   const [loginUser, setLoginUser] = useState(null);
  
//   useEffect(() => {
//     auth.onAuthStateChanged((userCred) => {
//       if (userCred) {
//         const { email, emailVerified, displayName } = userCred;
//         setLoginUser({ email, emailVerified, displayName });
//       }
//     });
//   }, []);

//   return (
//     <>
//       {loginUser && loginUser.emailVerified ? (
//         <>
//           {window.location.href = "/xxxx"}
//         </>
//       ) : (
//         <FormLoginNew />
//       )}
//     </>
//   );
// };

// export default LoginFirebase;
