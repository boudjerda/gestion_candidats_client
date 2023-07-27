import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import '../css/listUtilisateurs.css';
import CardCondidat from '../components/cardCondidats';
import RechercheCandidat from '../components/filterCandidat';
import MenuFilter from '../components/menuFilter';
import { Slide } from "react-awesome-reveal";
import axiosInstance from '../axiosConfig'
import LogoutIcon from '@mui/icons-material/Logout';
 const ListCondidats = ({setAuth}) => {
  const [candidats,setCandidats] = useState([])
  const [candidats1,setCandidats1] = useState([])
  const [supCandidats,setSupCandidats] = useState(false)
  const [selectedItem,setSelectedItem] = useState("nom")




  const listcandidatsback=()=>{
    axiosInstance.get('/candidats')
  .then(response => {
    const responseData=response.data
    setCandidats(responseData)
    setCandidats1(responseData)
  
  })
  .catch(error => {
    console.error(error);
  });
  }
  const filtredName = (name) => {
    const filteredCandidats = selectedItem === "nom" ?  candidats.filter((candidat) => candidat.nom.includes(name)):( selectedItem === "profil" ? candidats.filter((candidat) => candidat.profil.includes(name)):candidats.filter((candidat) => candidat.prenom.includes(name)));
    name? setCandidats(filteredCandidats):setCandidats(candidats1) 

  };
  
 
  useEffect(() => {
    listcandidatsback()
  
  }, [supCandidats]);
  const sendData = (data) => {
    setSupCandidats(!supCandidats) // Afficher les données reçues du composant enfant
  };
  const getSelectedItem = (data) => {
  // Afficher les données reçues du composant enfant
  setSelectedItem(data)

  };
const deco =()=>{
  setAuth(false)
  localStorage.removeItem('token');
}
  
  return (
    <div className='listCondidat'>
        <div className='listCondidathead' >
      <nav>
        <Link className='navLink'  to="/" style={{ padding: 5 }}> 
          <h1 className='archibaldtitle'>ARCHIBALD</h1>
          <h1 className='headit'>IT</h1>
        </Link>
      </nav>
        <button className='lougoutButton' onClick={deco}><LogoutIcon/> Déconnexion</button>
      </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' ,marginRight:"10px"}}>
          <RechercheCandidat candidats={candidats} filtredName={filtredName} selectedItem={selectedItem} />
          <MenuFilter  getSelectedItem={getSelectedItem}/>
        </div>
        <div className='listUser'>
         <Slide direction="left" className='mediaCardSlide'>
           <h1 style={{color:"white"}}>liste des candidats :</h1>
         </Slide>
          <div className='listCard'>
          {candidats?.map((candidat, index) => (
            <Slide key={index} direction="right" className='mediaCardSlide'>
              <CardCondidat key={index} candidat={candidat} sendData={sendData} />
           </Slide>
          ))}
          </div>
          
      </div>
    </div>
  )
}
export default ListCondidats;