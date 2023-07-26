import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function RechercheCandidat({candidats,filtredName,selectedItem}) {
    const [candidat,setCandidat] = useState("")
    const [candidatNoDuplicated,setCandidatNoDuplicated] = useState([])
    const NameCond=()=>{
        filtredName(candidat)
    }
    const removeDuplicates = (candidats, selectedItem) => {
      const uniqueValues = new Set();
      candidats?.forEach(obj => {
        uniqueValues.add(obj[selectedItem]);
      });
      const myArray = [...uniqueValues].map(item => ({ param: item }));
      setCandidatNoDuplicated(myArray)
    
    };
    useEffect(() => {
      if (candidats) {
        removeDuplicates(candidats, selectedItem);
      }
    }, [candidats, selectedItem]);
    
    const handleCandidatChange = (event, value) => {
      setCandidat(event.target.value);
      
    };
    
    useEffect(() => {
        NameCond()
      }, [candidat]);
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={candidatNoDuplicated}
      autoHighlight
      getOptionLabel={(option) => option.param}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.param}
        </Box>
      )}
      renderInput={(params) => (
        <TextField onChange={handleCandidatChange}  onSelect={handleCandidatChange}
          {...params}
          label="Recherche"
        
          InputLabelProps={{
            style: { color: 'white' },
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}


