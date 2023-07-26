import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../css/cardCondidats.css';
import BasicModal from './formAffichageUser';
import axios from 'axios';
import UpdateUserModal from './formUpdateUser';
import  ConfirmationModal from './confirmationModal';
import axiosInstance from '../axiosConfig'
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CardCondidat({candidat,sendData}) {
  const [open, setOpen] = React.useState(false);
  const [uniqueCandidat, setUniqueCandidat] = React.useState(null);
  const [uniqueCandidatUpdate, setUniqueCandidatUpdate] = React.useState(null);
  const [openConf, setOpenConf] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpen = async() => {
    axiosInstance.get(`/candidats/${candidat.id}`)
    .then(response => {
     setUniqueCandidat(response.data)
    
    })
    .catch(error => {
      console.error(error);
    });
    setOpen(true);
  }
  const handleClose = () => {
    setUniqueCandidat(null)
    setOpen(false);
  }
  const handleCloseUpdate = () => {
    setOpenUpdate(false);}
  const handleUpdate = () =>  {
    axiosInstance.get(`/candidats/${candidat.id}`)
    .then(response => {
      setUniqueCandidatUpdate(response.data)
    }) 
    .catch(error => {
      console.error(error);
    });
  
    setOpenUpdate(true);
    
  }
  const handleDelete = () => {
    axiosInstance.delete(`/candidats/${candidat.id}`)
    .then(response => {
      // Gérer la réponse en cas de succès
    })
    .catch(error => {
      // Gérer l'erreur en cas d'échec
      console.error('Une erreur s\'est produite lors de la suppression de la ressource', error);
    });
    
 };
 const handleClickOpenConf = () => {
  setOpenConf(true);
};

const handleCloseConf = () => {
  setOpenConf(false);
};
const handleSubmitConf = () => {
  handleDelete();
  sendData(!true); 
  setOpenConf(false);
};
  return (
    <>
    <Card className='cardcondi'>
      <CardMedia
        className='cardMediacondi'
        image={candidat?.sexe=="Homme" ? "/condidat1.png":"/femmeCandidat.png"}
        title="green iguana"
      />
      <CardContent className='cardContentcondi'>
        <Typography gutterBottom variant="h5" component="div">
          {candidat.prenom} {candidat.nom}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {candidat.profil}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen}>Afficher</Button>
        <Button size="small" onClick={handleUpdate}>Modifier</Button>
        <Button size="small" onClick={handleClickOpenConf}>Supprimer</Button>
      </CardActions>
    </Card>
       {uniqueCandidat ? <BasicModal open={open} handleClose={handleClose} candidat={uniqueCandidat}  /> : null}
      {uniqueCandidatUpdate ? <UpdateUserModal open={openUpdate} handleCloseUpdate={handleCloseUpdate} candidat={uniqueCandidatUpdate}  />:null}
       <ConfirmationModal handleClickOpenConf={openConf} handleCloseConf={handleCloseConf} handleSubmitConf={handleSubmitConf}/>
    </>
  );
}
