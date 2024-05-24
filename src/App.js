import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import AgendaTurnos from "./components/AgendaTurnos";
import ListClients from "./components/ListClients.jsx";
import ListVentas from "./components/ListVentas.jsx";
import Informe from "./components/Informe.jsx";
import CreateDog from "./components/CreateDog.jsx";
import SettingClient from "./components/SettingClient.jsx";
import FormRegister from "./components/Formulario/FormsRegister.jsx";
import FormLoginNew from "./components/Formulario/FormLoginNew.jsx";
import NavBarLat from "./components/Menues/NavBarLat.jsx";
import Prueba from "./components/Prueba.jsx";
import FormAddCompany from "./components/Formulario/FormAddCompany.jsx";
import LoginFirebase from "./components/LoginFirebase.jsx";
import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges,verificationCompaniesExist } from "./reducer/actions.jsx";
// display:flex (allows the sidebar component to be next to another)
function App() {
  const loginUser = useSelector((state) => state.user);
  const companies = useSelector((state) => state.arrayCompanies.data);

  
  // if(typeof companies==="object"){
  //   if(companies.companies !== undefined)
  //   console.log(companies.companies[0])
  // }else{
  //   console.log("false")
  // }

  const dispatch = useDispatch();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const sidebarWidth = "17rem"; // Ancho del sideBar cuando está abierto
  const sidebarWidth2 = "5rem";

  useEffect(() => {
    dispatch(listenToAuthChanges());
    //dispatch(verificationCompaniesExist(loginUser.email))
  }, [dispatch]);

  useEffect(() => {
    if (loginUser) {
      dispatch(verificationCompaniesExist(loginUser.email));
    }
  }, [dispatch, loginUser]);

  const routesContent = (
    <Routes>
      {/* Definir rutas comunes aquí */}
      <Route path="/dashboard" element={<AgendaTurnos />} />
      <Route path="/listClient" element={<ListClients />} />
      <Route path="/listVentas" element={<ListVentas />} />
      <Route path="/Informe" element={<Informe />} />
      <Route path="/CreateDog" element={<CreateDog />} />
      <Route path="/settingClient" element={<SettingClient />} />
      <Route path="/prueba" element={<Prueba />} />
      <Route path="/addCompany" element={<FormAddCompany />} />
    </Routes>
  );

  const routesContentInicio = (
    <Routes>
      <Route path="/register" element={<FormRegister />} />
      <Route path="/login" element={<FormLoginNew />} />
      <Route path="/" element={<LoginFirebase />} />
    </Routes>
  );

  return (
    <>
      {loginUser ? (
        <BrowserRouter>
          <div>
            <NavBarLat userLogin={loginUser.displayName} companies={companies}/>
            <div>{routesContent}</div>
          </div>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <div>{routesContentInicio}</div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;

/// //////////////////////////////////////////
// import React from 'react';
// import axios from 'axios';

// import './App.css';

// class App extends React.Component {

//   state = {
//     title: '',
//     body: '',
//     posts: []
//   };

//   componentDidMount = () => {
//     this.getBlogPost();
//   };

//   getBlogPost = () => {
//     axios.get('/api')
//       .then((response) => {
//         const data = response.data;
//         this.setState({ posts: data });
//         console.log('Data has been received!!');
//       })
//       .catch(() => {
//         alert('Error retrieving data!!!');
//       });
//   }

//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value });
//   };

//   submit = (event) => {
//     event.preventDefault();

//     const payload = {
//       title: this.state.title,
//       body: this.state.body
//     };

//     axios({
//       url: '/api/save',
//       method: 'POST',
//       data: payload
//     })
//       .then(() => {
//         console.log('Data has been sent to the server');
//         this.resetUserInputs();
//         this.getBlogPost();
//       })
//       .catch(() => {
//         console.log('Internal server error');
//       });;
//   };

//   resetUserInputs = () => {
//     this.setState({
//       title: '',
//       body: ''
//     });
//   };

//   displayBlogPost = (posts) => {

//     if (!posts.length) return null;

//     return posts.map((post, index) => (
//       <div key={index} className="blog-post__display">
//         <h3>{post.title}</h3>
//         <p>{post.body}</p>
//       </div>
//     ));
//   };

//   render() {

//     console.log('State: ', this.state);

//     //JSX
//     return(
//       <div className="app">
//         <h2>BIENVENIDO FORMATO</h2>
//         <form onSubmit={this.submit}>
//           <div className="form-input">
//             <input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={this.state.title}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className="form-input">
//             <textarea
//               placeholder="body"
//               name="body"
//               cols="30"
//               rows="10"
//               value={this.state.body}
//               onChange={this.handleChange}
//             >

//             </textarea>
//           </div>

//           <button>Submit</button>
//         </form>

//         <div className="blog-">
//           {this.displayBlogPost(this.state.posts)}
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
