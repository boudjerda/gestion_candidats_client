import React from 'react'
import '../css/accueil.css';
import { Slide } from "react-awesome-reveal";
import MediaCard from '../components/card';
import LogoutIcon from '@mui/icons-material/Logout';
 const Accueil = ({setAuth}) => {
  
  const deco =()=>{
    setAuth(false)
    localStorage.removeItem('token');
  }
  return (
    <div className='accueil'>
      <div className='accueilhead' >
        <div className='headtitleglob'>
          <h1 className='archibaldtitleac'>ARCHIBALD</h1>
          <h1 className='headit'>IT</h1>
        </div>
         <button className='lougoutButton' onClick={deco}><LogoutIcon/> Déconnexion</button>
      </div>  
      <div className='navbarCard'>
      <Slide direction="left" className='mediaCardSlide'>
        <MediaCard className='mediaCard' title={"Liste de condidats"} />
      </Slide>
           <div className="space"></div>
      <Slide direction="right" className='mediaCardSlide'>
        <MediaCard  title={"Ajouter un condidat"} />
      </Slide>
    </div>
    </div>
  )
}
export default Accueil;

