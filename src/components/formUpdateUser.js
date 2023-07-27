import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axiosInstance from '../axiosConfig'

const style = {
  position: 'absolute',
  display: "flex",
  flexDirection: "column",
  gap: "5px", 
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', 
};



export default function UpdateUserModal(props) {
  const [open, setOpen] = useState(false);
  const [newCondidat, setNewCondidat] = useState({id:props.candidat?.id,profil:props.candidat?.profil,linkedin:props.candidat?.linkedin,nom:props.candidat?.nom,prenom:props.candidat?.prenom,cv:props.candidat?.cv.data
,email:props.candidat?.email,dateEntretien:props.candidat?.dateEntretien,NombreAnexp:props.candidat?.NombreAnexp,passeport:props.candidat?.passeport.data});
  const changeOption = () => setOpen(props.open);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Créez un objet FormData pour envoyer les données, y compris le fichier PDF
      const formData = new FormData();
      formData.append('nom', newCondidat.nom);
      formData.append('prenom', newCondidat.prenom);
      formData.append('sexe', props.candidat.sexe);
      formData.append('email', newCondidat.email);
      formData.append('profil', newCondidat.profil);
      formData.append('linkedin', newCondidat.linkedin);
      formData.append('NombreAnexp', newCondidat.NombreAnexp);
      formData.append('dateEntretien', newCondidat.dateEntretien);
      formData.append('file', newCondidat.cv);
      formData.append('file', newCondidat.passeport);
      
      const response = await axiosInstance.put(`/candidats/${newCondidat.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      window.location.reload();
       
      // Réinitialisez le formulaire après l'envoi réussi des données
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'envoi des données:', error);
    } 
  };
 

  useEffect(() => {
    changeOption();
  }, [props.open]);
  const handleInputChange = (e) => {
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
      setNewCondidat({
        ...newCondidat,
        [name]: modifiedFile, // Assurez-vous que le champ 'cv' de l'état contient le fichier sélectionné
      });
    } else {
            setNewCondidat((prevState) => ({
                ...prevState,
                [name]: value,
              }))
          }
    
  };

  return (
    <div >
      <Modal
    
        open={open}
        onClose={props.handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Typography style={{display:"flex", alignItems: "center", justifyContent: "center"}} id="modal-modal-title" variant="h6" component="h2">
            <strong>{props.candidat?.prenom} {props.candidat?.nom}</strong>
          </Typography>
            <label>Profil</label>
            <TextField
                type="text"
                name="profil"
                value={newCondidat.profil}
                onChange={handleInputChange}
                />
                 <label>linkedin</label>
            <TextField
                type="text"
                name="linkedin"
                value={newCondidat.linkedin}
                onChange={handleInputChange}
            />
   
                <label>Nombre d'années d'expérience</label>
                <TextField
                    type="text"
                    name="NombreAnexp"
                    value={newCondidat.NombreAnexp}
                    onChange={handleInputChange}
                    />

                <label>Email</label>
                <TextField
                    type="text"
                    name="email"
                    value={newCondidat.email}
                    onChange={handleInputChange}
                    />

                <label>Date d'entretien </label>
                <TextField
                    type="date"
                    name="dateEntretien"
                    value={newCondidat?.dateEntretien.split("T")[0]}
                    onChange={handleInputChange}
                    />

                <label>Modifier le CV </label>
                <TextField
                     name="cv"
                     type="file"
                     accept="application/pdf"
                     onChange={handleInputChange}
                 />
                  <label>Modifier le Passeport </label>
                <TextField
                     name="passeport"
                     type="file"
                     accept="application/pdf"
                     onChange={handleInputChange}
                 />
                 <div style={{display:"flex",flexDirection:"row",gap: "5px", justifyContent: "center", alignItems: "center"}}>
                    <Button className='btnaddcondidat' variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Modifier 
                    </Button>
                    <Button className='btnaddcondidat' variant="contained" color="error" type="submit" onClick={props.handleCloseUpdate}>
                    Fermer
                   </Button>
                 </div>
        </Box>
      </Modal>
    </div>
  );
}
