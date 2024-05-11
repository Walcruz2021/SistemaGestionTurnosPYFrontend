import { React, useState } from "react";
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
import SideBar from "./components/Menues/SideBar.jsx";

// display:flex (allows the sidebar component to be next to another)
function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const sidebarWidth = "17rem"; // Ancho del sideBar cuando está abierto
  const sidebarWidth2 = "5rem";

  const routesContent = (
    <Routes>
      {/* Definir rutas comunes aquí */}
      <Route path="/login" element={<FormLoginNew />} />
      <Route path="/" element={<AgendaTurnos />} />
      <Route path="/listClient" element={<ListClients />} />
      <Route path="/listVentas" element={<ListVentas />} />
      <Route path="/Informe" element={<Informe />} />
      <Route path="/CreateDog" element={<CreateDog />} />
      <Route path="/settingClient" element={<SettingClient />} />
      <Route path="/register" element={<FormRegister />} />
    </Routes>
  );

  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <div style={{ flex: "0 0 auto" }}>
          <SideBar
            touchSide={isSideBarOpen}
            setTouchSide={setIsSideBarOpen}
          />
        </div>

        {/* Routes */}
        <div style={{ flex: "1", paddingLeft: isSideBarOpen ? sidebarWidth : sidebarWidth2 }}>
          {routesContent}
        </div>
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
