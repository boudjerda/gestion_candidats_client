import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

export function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ConfirmationModal(props) {
  const [open, setOpen] = React.useState(false);
  const [openConf, setOpenConf] = React.useState(false);
 
  useEffect(() => {
    setOpenConf(props.handleClickOpenConf)
 
  }, [props.handleClickOpenConf]);

  return (
    <div>
     
      <Dialog
        open={openConf}
        onClose={props.handleCloseConf}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
           Voulez-vous vraiment supprimer  cet utilisateur ?
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={props.handleCloseConf}>
            Annuler
          </Button>
          <Button onClick={props.handleSubmitConf}>OUI</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}