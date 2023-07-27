import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Slide } from "react-awesome-reveal";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(false);

  const changeOption = () => setOpen(props.open);


  const downloadPdf = () => {
    const pdfBlob = new Blob([new Uint8Array(props.candidat.cv.data)], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `CV ${props.candidat.nom}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const downloadPdfPasseport = () => {
    const pdfBlob = new Blob([new Uint8Array(props.candidat.passeport.data)], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `Passeport ${props.candidat.nom}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    changeOption();
  }, [props.open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{display:"flex", alignItems: "center", justifyContent: "center"}} id="modal-modal-title" variant="h6" component="h2">
          <Slide direction="down" className='mediaCardSlide'>
            <h2>{props.candidat?.prenom} {props.candidat?.nom}</h2>
          </Slide>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Profil:</strong> {props.candidat?.profil}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>linkedin:</strong> 
              {props.candidat?.linkedin && (
                <a href={props.candidat.linkedin} target="_blank" rel="noopener noreferrer">
                  {props.candidat.linkedin}
                </a>
              )}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Nombre d'années d'expérience:</strong> {props.candidat?.NombreAnexp}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Email:</strong> {props.candidat?.email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Date d'entretien:</strong> {props.candidat?.dateEntretien.split("T")[0]}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{display:"flex",flexDirection:"row"}}>
            <strong>Télécharger le CV : </strong>
            {props.candidat?.cv.data && (
              <img src="/download-pdf-icon.png" alt="Description de l'image" onClick={downloadPdf} style={{width:"30px",marginLeft:"10px"}}/>
            )}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{display:"flex",flexDirection:"row"}}>
            <strong>Télécharger la carte identité : </strong>
            {props.candidat?.passeport.data && (
              <img src="/download-pdf-icon.png" alt="Description de l'image" onClick={downloadPdfPasseport} style={{width:"30px",marginLeft:"10px"}}/>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
