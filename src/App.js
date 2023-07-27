import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import ListCondidats from './pages/listCondidats';
import React,{useState,useEffect} from "react";
import Accueil from './pages/accueil';
import NoMatch from './pages/noMatch';
import AjoutCondidat from './pages/ajoutCondidat';
import Login from './pages/login';
import axiosInstance from './axiosConfig'
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(true);

  const setAuth = (boolean) =>{
    setIsAuthenticated(boolean) 
  }
  async function isAuth(){
    axiosInstance.get('/jwtAuth/is-verify')
    .then(response => {
      const parseRes = response.data;

      // Assurez-vous que 'parseRes' contient bien la valeur attendue (true ou false)
      if (parseRes === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      console.log("parseRes", parseRes);
    })
  .catch(error => {
    console.log("erreur")
    setIsAuthenticated(false)
  });
  
    
    
  }
  useEffect(()=>{
    isAuth()
},[])
  return (
    <Router>
      <Routes>
        <Route path="/"   element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/accueil" />} />
        <Route path="/accueil" element={isAuthenticated ? <Accueil setAuth={setAuth}/> : <Navigate to="/" />} />
        <Route path="/ListCondidats" element={isAuthenticated ? <ListCondidats setAuth={setAuth} /> : <Navigate to="/" />} />
        <Route path="/AjoutCondidat" element={isAuthenticated ? <AjoutCondidat setAuth={setAuth} /> : <Navigate to="/" />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
 