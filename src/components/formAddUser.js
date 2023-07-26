import React, { useState } from 'react';
import axios from 'axios';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { TextField, Button,Radio, RadioGroup, FormControlLabel  } from '@mui/material';
import axiosInstance from '../axiosConfig'
import '../css/formadduser.css'; 

function UserForm() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    sexe:"Homme",
    email: '',
    profile: '',
    linkedin:" ",
    experienceYears: '',
    interviewDate: '',
    cv:null,
    passeport:null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      let modifiedFile;
      if(name=="cv"){
         modifiedFile = new File([file], "cv" + file.name, { type: file.type });
      }else{
         modifiedFile = new File([file], "passeport" + file.name, { type: file.type });
      }
      console.log("fileeeeee",  name);
      setUser({
        ...user,
        [name]: modifiedFile, // Assurez-vous que le champ 'cv' de l'état contient le fichier sélectionné
      });
    }
     else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };
  const handleChange1 = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      console.log(files[0])
      for(let i=0;i < files.length;i++ ){
         if(files[i].name.startsWith("CV")){
          console.log("cv",files[i])
         }else{
          console.log("not cv",files[i])
         }
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Créez un objet FormData pour envoyer les données, y compris le fichier PDF
      const formData = new FormData();
      formData.append('nom', user.lastName);
      formData.append('prenom', user.firstName);
      formData.append('email', user.email);
      formData.append('sexe', user.sexe);
      formData.append('profil', user.profile);
      formData.append('linkedin', user.linkedin);
      formData.append('NombreAnexp', user.experienceYears);
      formData.append('dateEntretien', user.interviewDate);
      formData.append('file', user.cv);
      formData.append('file', user.passeport);
      
    
      const response = await axiosInstance.post('/candidats', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
     
      // Réinitialisez le formulaire après l'envoi réussi des données
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        sexe:" Homme",
        profile: '',
        linkedin:" ",
        experienceYears: '',
        interviewDate: '',
        cv:new File([], ''),
        passeport:new File([], ''),
      });
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'envoi des données:', error);
    }
  };
  

  return (
    <div className="formContainerWrapper">
    <form className="formContainer" onSubmit={handleSubmit}>
    <div className="formRow">
    <label htmlFor="firstName">Prénom :</label>
      <TextField
      sx={{ input: { color: 'white' } }}
        name="firstName"
        label="Prénom"
        value={user.firstName}
        onChange={handleChange}
        required
      />
      </div>
      <div className="formRow">
       <label htmlFor="firstName">Nom de famille :</label>
      <TextField
       sx={{ input: { color: 'white' } }}
        name="lastName"
        label="Nom de famille"
        value={user.lastName}
        onChange={handleChange}
        required
      />
      </div>
      <div className="formRow">
      <label htmlFor="firstName">Sexe :</label>
      <RadioGroup name="sexe" value={user.sexe} onChange={handleChange}>
        <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
        <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
      </RadioGroup>

      </div>
      <div className="formRow">
      <label htmlFor="firstName">Email :</label>
      <TextField
       sx={{ input: { color: 'white' } }}
        name="email"
        label="Email"
        type="email"
        value={user.email}
        onChange={handleChange}
        required
      />
      </div>
      <div className="fieldContainer">
      <div className="formRow">
      <label htmlFor="firstName">Profil :</label>
        <TextField
         sx={{ input: { color: 'white' } }}
          name="profile"
          label="Profil"
          value={user.profile}
          onChange={handleChange}
          required
        />
        </div>
      </div>
      <div className="fieldContainer">
      <div className="formRow">
      <label htmlFor="firstName" style={{display:"flex",grap:"1"}} > <div style={{marginTop:"-1px"}}> linkedin</div>  <LinkedInIcon /> :</label>
        <TextField
         sx={{ input: { color: 'white' } }}
          name="linkedin"
          label="linkedin"
          value={user.linkedin}
          onChange={handleChange}
          required
        />
        </div>
      </div>
      <div className="fieldContainer">
      <div className="formRow">
      <label htmlFor="firstName">Nombre d'années d'expérience :</label>
        <TextField
         sx={{ input: { color: 'white' } }}
          name="experienceYears"
          label="Nombre d'années d'expérience"
          value={user.experienceYears}
          onChange={handleChange}
          required
        />
        </div>
      </div>
      <div className="fieldContainer">
      <div className="formRow">
        <label htmlFor="firstName">Date d'entretien :</label>
        <TextField
         sx={{ input: { color: 'white' } }}
          name="interviewDate"
          label=""
          type="date"
          value={user.interviewDate}
          onChange={handleChange}
          required
        />
      </div>
      </div>
      <div className="fieldContainer">
       <div className="formRow">
        <label htmlFor="firstName">CV (format PDF) :</label>
        <TextField
         sx={{ input: { color: 'white' } }}
          name="cv"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          required
        />
       </div>
      </div>
      <div className="fieldContainer">
       <div className="formRow">
        <label htmlFor="firstName">carte identité (format PDF) :</label>
        <TextField
         sx={{ input: { color: 'white' } }}
          name="passeport"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          
        />
       </div>
       <div className="formRow">
        <label htmlFor="firstName">Autre fichiers (format PDF) :</label>
        <input
         sx={{ input: { color: 'white' } }}
          name="test"
          type="file"
          onChange={handleChange1}
          required
          multiple
        />
       </div>
      </div>
      <div className="buttonContainer">
      <Button className='btnaddcondidat' variant="contained" color="primary" type="submit">
        Ajouter le candidat
      </Button>
    </div>
    </form>
    </div>
  );
}

export default UserForm;
