import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../api/configFirebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { verificationCompaniesExist } from "../../reducer/actions/actionsCompany";
import { listenToAuthChanges } from "../../reducer/actions/actions";

import { addUser, searchUser } from "../../reducer/actions/actionsUser";
import ModalRestPassword from "../Modal/ModalRestPassword";
import "./FormLoginNew.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import logoNew from "../../IMAGENES/LogoNew.png";
import FrontPageRegisterLogin from "./FrontPageRegisterLogin";
import { motion } from "framer-motion";
const IconUser = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);
function FormLoginNew({ autUser }) {


  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(auth, provider);
    const emailUserNew = credentials.user.email;
    const fullNameUserNew = credentials.user.displayName;
    const newUserService = {
      fullName: fullNameUserNew,
      status: true,
      email: emailUserNew,
    };
    dispatch(addUser(newUserService));
    try {
      onAuthStateChanged(auth, async (user) => {
        console.log(user);
      });
    } catch (error) {
      console.log(error.message, error.code);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShow = () => {
    setShow(!show);
  };

  const verificationCompanies = async (email) => {
    const response = dispatch(verificationCompaniesExist(email));
    return response;
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (stateValue.email.trim() === "" || stateValue.password.trim() === "") {
      MySwal.fire({
        title: "Error Login",
        text: "Campos vacíos",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(255, 140, 0)",
      });
      return;
    }

    try {
      // 🔑 Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        stateValue.email,
        stateValue.password
      );

      const user = userCredential.user;


      // ⚠️ Verifico el correo
      if (!user.emailVerified) {
        await auth.signOut(); // lo sacamos
        MySwal.fire({
          title: "¡Correo electrónico no verificado!",
          text: "Por favor, verifica tu correo electrónico para continuar.",
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "rgb(255, 140, 0)",
        });
        return;
      }


      // ✅ Si está verificado, sigue el flujo normal
      MySwal.fire({
        title: "¡Usuario Logueado Correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(21, 151, 67)",
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch(listenToAuthChanges());
          const resVerification = await verificationCompanies(user.email);

          if (resVerification.payload.status === 200) {
            navigate("/");
          } else if (resVerification.payload.status === 204) {
            navigate("/addCompany");
          }
        }
      });

    } catch (error) {
      console.log("Error:", error.code, error.message);

      if (error.code === "auth/invalid-credential") {
        MySwal.fire({
          title: "Error Login",
          text: "Usuario o Contraseña Incorrecta",
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "rgb(255, 140, 0)",
        });
      } else if (error.code === "auth/invalid-email") {
        MySwal.fire({
          title: "Error Login",
          text: "Debe ingresar un Email válido",
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "rgb(255, 140, 0)",
        });
      } else {
        MySwal.fire({
          title: "Error Login",
          text: "Ha ocurrido un error inesperado",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };



  const RedirectLink = () => {
    navigate("/register");
  };

  const RedirectLinkContact = () => {
    navigate("/supportForm");
  };
  return (
    // <div className="container py-3 mt-2">
    //   <div className="row justify-content-center">
    //     <div className="col-md-5">
    //       <div className="text-center">
    //         <div className="card-body">
    //           <div className="login-form">

    //             <motion.div initial={{ opacity: 0, x: -30 }}
    //               animate={{ opacity: 1, x: 0 }}
    //               transition={{ duration: 0.5, ease: "easeOut" }}
    //               className="flex-1 flex flex-col justify-center px-10 py-12 bg-black"
    //               style={{ background: "#0c0000" }}>

    //               {/* Logo + Title */}
    //               <div className="mb-10 text-center">
    //                 {/* reemplazar con: <img src={logoNew} className="w-28 mx-auto mb-4" alt="logo" /> */}
    //                 <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mx-auto mb-4">
    //                   <svg width="28" height="28" fill="none" stroke="white" strokeWidth="1.6" viewBox="0 0 24 24">
    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    //                   </svg>
    //                 </div>
    //                 <h2 className="text-white font-bold text-2xl tracking-tight">Gestión de Turnos PY</h2>
    //                 <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mt-3">Acceso al sistema</p>
    //               </div>

    //               <form onSubmit={handleSumbit} className="flex flex-col gap-5">


    //                 <div className="flex flex-col gap-1.5">

    //                   <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">

    //                     <IconUser /> Correo electrónico
    //                   </label>

    //                   <div className={`mt-1 flex items-center gap-3 px-4 py-3 border transition-all duration-200 bg-white/[0.03] "border-white/30" : "border-white/[0.08]"}`}>

    //                     <input
    //                       className="bg-transparent flex-1 text-white text-sm placeholder-zinc-600 outline-none"
    //                       id="form1"
    //                       type="email"
    //                       name="email"
    //                       value={stateValue.email}
    //                       placeholder="Ingrese su Email"
    //                       onChange={handleChange}
    //                       maxLength={30}
    //                       required
    //                     />
    //                   </div>

    //                 </div>



    //                 <div className="flex flex-col gap-1.5">

    //                   <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
    //                     <RiLockPasswordFill />  PASSWORD

    //                   </label>

    //                   <div className={`mt-1 flex items-center gap-3 px-4 py-3 border transition-all duration-200 bg-white/[0.03]  "border-white/30" : "border-white/[0.08]"}`} >

    //                     <input
    //                       className="bg-transparent flex-1 text-white text-sm placeholder-zinc-600 outline-none"
    //                       id="form2"
    //                       type="password"
    //                       name="password"
    //                       value={stateValue.password}
    //                       placeholder="Ingrese Contraseña"
    //                       maxLength={20}
    //                       onChange={handleChange}
    //                       required
    //                     />
    //                   </div>

    //                   <ModalRestPassword show={show} setShow={setShow} />

    //                   <motion.button>


    //                     {!stateValue.email || !stateValue.password ? (
    //                       <button
    //                         className="mt-1 w-full py-3 text-sm font-semibold tracking-wide transition-all duration-200 bg-white/[0.05] text-zinc-600 border border-white/[0.06] cursor-not-allowed"
    //                         type="submit"
    //                         disabled
    //                       >
    //                         Inicio de Sesión
    //                       </button>
    //                     ) : (
    //                       <button
    //                         className="mt-1 w-full py-3 text-sm font-semibold tracking-wide transition-all duration-200 bg-white text-zinc-950 hover:bg-zinc-100 shadow-lg shadow-white/10"
    //                         type="submit"
    //                       >
    //                         Inicio de Sesión
    //                       </button>
    //                     )}

    //                   </motion.button>


    //                   <div className="mt-10 text-center flex items-center justify-center gap-3">
    //                     <span className="text-xs text-zinc-600">¿No tenés cuenta?</span>
    //                     <button
    //                       className="text-xs text-white underline underline-offset-2 hover:text-zinc-300 transition-colors duration-150 font-medium"
    //                       onClick={RedirectLink}
    //                     >
    //                       Registrarse
    //                     </button>
    //                   </div>
    //                 </div>

    //               </form>
    //             </motion.div>

    //           </div>

    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-5">
    //       <FrontPageRegisterLogin onContact={RedirectLinkContact} />
    //     </div>
    //   </div>
    // </div>
    <div className="container px-3 sm:px-4 md:px-6 py-4 sm:py-6 mt-2">
  <div className="row justify-content-center g-4">

    {/* LOGIN */}
    <div className="col-12 col-lg-5">
      <div className="text-center">
        <div className="card-body p-0">
          <div className="login-form">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="
                w-full
                flex flex-col justify-center
                px-5 sm:px-8 md:px-10
                py-8 sm:py-10 md:py-12
                rounded-2xl
                border border-white/[0.06]
                shadow-2xl
                bg-black
              "
              style={{ background: "#050505" }}
            >

              {/* Logo + Title */}
              <div className="mb-8 sm:mb-10 text-center">

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mx-auto mb-4">

                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>

                </div>

                <h2 className="text-white font-bold text-xl sm:text-2xl tracking-tight leading-tight">
                  Gestión de Turnos PY
                </h2>

                <p className="text-zinc-500 text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-3">
                  Acceso al sistema
                </p>

              </div>

              <form onSubmit={handleSumbit} className="flex flex-col gap-5">

                {/* EMAIL */}
                <div className="flex flex-col gap-2">

                  <label className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-medium">

                    <IconUser />
                    Correo electrónico

                  </label>

                  <div className="
                    mt-1
                    flex items-center gap-3
                    px-4 py-3
           
                    border border-white/[0.08]
                    transition-all duration-200
                    bg-white/[0.03]
                    focus-within:border-white/30
                  ">

                    <input
                      className="
                        bg-transparent
                        flex-1
                        text-white
                        text-sm
                        sm:text-[15px]
                        placeholder-zinc-600
                        outline-none
                      "
                      id="form1"
                      type="email"
                      name="email"
                      value={stateValue.email}
                      placeholder="Ingrese su Email"
                      onChange={handleChange}
                      maxLength={30}
                      required
                    />

                  </div>
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-2">

                  <label className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-medium">

                    <RiLockPasswordFill />
                    Password

                  </label>

                  <div className="
                    mt-1
                    flex items-center gap-3
                    px-4 py-3
          
                    border border-white/[0.08]
                    transition-all duration-200
                    bg-white/[0.03]
                    focus-within:border-white/30
                  ">

                    <input
                      className="
                        bg-transparent
                        flex-1
                        text-white
                        text-sm
                        sm:text-[15px]
                        placeholder-zinc-600
                        outline-none
                      "
                      id="form2"
                      type="password"
                      name="password"
                      value={stateValue.password}
                      placeholder="Ingrese Contraseña"
                      maxLength={20}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* OLVIDASTE CONTRASEÑA */}
                  <div className="flex justify-end mt-1">

                    <button
                      type="button"
                      onClick={handleShow}
                      className="
                        text-sm
                        text-zinc-300
                        hover:text-white
                        transition-colors duration-200
                        underline underline-offset-4
                      "
                    >
                      ¿Olvidaste la contraseña?
                    </button>

                  </div>

                  <ModalRestPassword show={show} setShow={setShow} />

                  {/* BUTTON */}
                  <motion.button className="w-full">

                    {!stateValue.email || !stateValue.password ? (

                      <button
                        className="
                          mt-3
                          w-full
                          py-3 sm:py-3.5
                
                          text-sm
                          font-semibold
                          tracking-wide
                          transition-all duration-200
                          bg-white/[0.05]
                          text-zinc-600
                          border border-white/[0.06]
                          cursor-not-allowed
                        "
                        type="submit"
                        disabled
                      >
                        Inicio de Sesión
                      </button>

                    ) : (

                      <button
                        className="
                          mt-3
                          w-full
                          py-3 sm:py-3.5
                    
                          text-sm
                          font-semibold
                          tracking-wide
                          transition-all duration-200
                          bg-white
                          text-zinc-950
                          hover:bg-zinc-100
                          shadow-lg shadow-white/10
                        "
                        type="submit"
                      >
                        Inicio de Sesión
                      </button>

                    )}

                  </motion.button>

                  {/* REGISTER */}
                  <div className="
                    mt-8 sm:mt-10
                    text-center
                    flex flex-col sm:flex-row
                    items-center
                    justify-center
                    gap-2 sm:gap-3
                  ">

                    <span className="text-xs sm:text-sm text-zinc-500">
                      ¿No tenés cuenta?
                    </span>

                    <button
                      className="
                        text-xs sm:text-sm
                        text-white
                        underline
                        underline-offset-2
                        hover:text-zinc-300
                        transition-colors duration-150
                        font-medium
                      "
                      onClick={RedirectLink}
                    >
                      Registrarse
                    </button>

                  </div>

                </div>

              </form>

            </motion.div>

          </div>
        </div>
      </div>
    </div>

    {/* PANEL DERECHO */}
    <div className="col-12 col-lg-5">
      <div className="h-full">
        <FrontPageRegisterLogin onContact={RedirectLinkContact} />
      </div>
    </div>

  </div>
</div>
  );
}

export default FormLoginNew;
