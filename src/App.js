import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import AgendaTurnos from "./components/AgendaTurnos";
import Layout from "./components/Layout.jsx";

import ListClients from "./components/ListClients.jsx";
import ListVentas from "./components/ListVentas.jsx";
import Informe from "./components/Informe.jsx";
import CreateDog from "./components/CreateDog.jsx";
import SettingClient from "./components/SettingClient.jsx";
import Register from "./components/Register.jsx";
import FormularioLoginUser from "./components/Formulario/FormularioLoginUser.jsx";
import RequireAuth from './components/RequireAuth.jsx';

// import AgendaTurnoxCliente from "./components/AgendaTurnoxCliente";
// import Home from "./components/Home"
//s

const ROLES = {
  'UserClient': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* <Route exact path='/' element={<LandingPage />} /> */}
          <Route path="/" element={<Layout />}>
            <Route path="/listClient" element={<ListClients />} />
            <Route path="/listVentas" element={<ListVentas />} />
            <Route path="/Informe" element={<Informe />} />
            <Route path="/CreateDog" element={<CreateDog />} />
            <Route path="/settingClient" element={<SettingClient />} />
            {/* <Route path='/register' element={<Register />} /> */}
            <Route path="/loginUser" element={<FormularioLoginUser />} />
              {/* we want to protect these routes */}

            {/* proteger las rutas anidadas dentro de él y permitir el acceso solo a usuarios que tengan el rol 
            específico de userClient (suponiendo que ROLES.userClient sea el valor correspondiente al rol de 
            usuario cliente). */}

            <Route element={<RequireAuth allowedRoles={[ROLES.UserClient]} />}>
              <Route path="/" element={<AgendaTurnos />} />
            </Route>
            {/* <Route path="/" element={<AgendaTurnos />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
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

//walterCruz
//Agkd@@r8NMd6MGf
