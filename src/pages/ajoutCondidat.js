import React from 'react'
import {Link} from 'react-router-dom';
import '../css/addcondidat.css';
import LogoutIcon from '@mui/icons-material/Logout';
import UserForm from '../components/formAddUser';
 const AjoutCondidat = ({setAuth}) => {
  const deco =()=>{
    setAuth(false)
    localStorage.removeItem('token');
  }
  return (
    <div className='addCondidat'>
      <div className='addcondidathead' >
      <nav>
      <Link className='navLink'  to="/" style={{ padding: 5 }}> 
        <h1 className='archibaldtitle'>ARCHIBALD</h1>
        <h1 className='headit'>IT</h1>
        </Link>
        </nav>
        <button className='lougoutButton' onClick={deco}><LogoutIcon/> Déconnexion</button>
      </div>
      <div className='adduser'>
          <h1 style={{color:"white"}}>Ajouter un Candidat :</h1>
          <div className='adduserForm' >
             <UserForm style={{marginBottom:"5px"}} />
          </div>
      </div>
      
    </div>
  )
}
export default AjoutCondidat;