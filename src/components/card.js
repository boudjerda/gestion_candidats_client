import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import '../css/card.css';
export default function MediaCard(props) {
  return (
    <>
    <Card className='card'>
      <CardMedia
      className='cardMedia'
        image= {props.title==="Liste de condidats"? "/listcondi.png":"/condidat1.png"}
        title="green iguana"
      />
      <CardContent className='cardContent'>
        <Typography gutterBottom variant="h5" component="div">
          {props.title==="Liste de condidats"? 
          <nav  >
          <Link   to="/ListCondidats" style={{ padding: 5,textDecoration: "none" }}>
            Liste des candidats
          </Link>
          </nav>:
           <nav>
          <Link  to="/AjoutCondidat" style={{ padding: 5 ,textDecoration: "none"}}>
             Ajouter un candidat
         </Link>
         </nav> }
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </>
  );
}
