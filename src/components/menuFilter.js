import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MenuFilter({getSelectedItem }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectionedItem, setSelectionedItem] = React.useState("nom");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  
  };
  const handleMenuItemClick = (value) => {
    console.log('Option sélectionnée :', value);
    setSelectionedItem(value)
    getSelectedItem(value)
    setAnchorEl(null); // Fermer le menu après la sélection
  };
  

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
          <div style={{borderRadius:"5px" ,border: "1px solid white",height:"36px",width:"auto",padding:"5px" , display: "flex",justifyContent: "center", alignItems: "center"}}>
              {selectionedItem}
          </div> 
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick('nom')}>NOM</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('prenom')}>Prénom</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('profil')}>Profile</MenuItem>

      </Menu>
    </div>
  );
}
