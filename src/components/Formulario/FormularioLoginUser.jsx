import React,{ useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
const LOGIN_URL = '/login';

function FormularioLoginUser () {
    const { setAuth } = useAuth();

    //navigate y location son utilizados para gestionar la navegación y la información de ubicación en una 
    //aplicación React con enrutamiento.
    //el componente FormularioLoginUser. navigate se utiliza para redirigir al usuario a una ruta específica después 
    //del inicio de sesión exitoso, mientras que location se utiliza para determinar la ruta de origen desde donde 
    //se inició el inicio de sesión, lo que permite al usuario volver a esa ruta después del inicio de sesión.
    const navigate = useNavigate();
    const location = useLocation();
    //se reemplaza  const from = location.state?.from?.pathname || "/"; 
    const from = location.state?.from?.pathname || "/";

    //por este codigo debido a error de configuracion de babel
    // let from = "/";
    // if (location.state && location.state.from && location.state.from.pathname) {
    //   from = location.state.from.pathname;
    // }
    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [userName, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ userName, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            //console.log(response)
            //console.log(response?JSON.stringify(response.data):null);
            //console.log(JSON.stringify(response));
          
            const accessToken = response?.data?.accessToken;
            //const accessToken = response && response.data && response.data.accessToken;
            const roles = response?.data?.roles;
            //const roles = response&&response.data&&response.data.roles;

            //setAuth se utiliza para establecer el estado de autenticación después de un inicio de sesión exitoso
            setAuth({ userName, password, roles, accessToken });
            setUserName('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err)
            if (!err?.response) {
            //if (!err || !err.response) {
                setErrMsg('No Server Response');
            } //else if (err.response?.status === 400) {
            else if (err && err.response && err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err && err.response && err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
            
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="userName"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default FormularioLoginUser