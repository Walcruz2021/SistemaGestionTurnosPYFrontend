import React, { useState, useEffect } from "react";
import FormLoginNew from "./Formulario/FormLoginNew";
import { auth } from "../hooks/configFirebase";


const LoginFirebase = () => {
  const [loginUser, setLoginUser] = useState(null);
  console.log(loginUser,"LOGINNN")
  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const { email, emailVerified, displayName } = userCred;
        setLoginUser({ email, emailVerified, displayName });
      }
    });
  }, []);

  return (
    <>
      {loginUser && loginUser.emailVerified ? (
        <>
          {window.location.href = "/dashboard"}
        </>
      ) : (
        <FormLoginNew />
      )}
    </>
  );
};

export default LoginFirebase;
