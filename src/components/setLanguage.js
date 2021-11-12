import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

import { languageOptions } from './languages/index.js'; 
import { LanguageContext } from '../context/LanguageContext.js';

const StyledButtonGroup = styled(ButtonGroup)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  color: 'white',
});

const StyledButton = styled(Button)({
  color: 'white',
  backgroundColor: '#171515',
  borderRadius: '25%',
  border: '1px solid #171515',
  fontSize: '1.2rem',
  padding: '0.5rem',
  margin: '0.5rem',
  '&:hover': {
    backgroundColor: '#716f6f',
  },
});

export default function SetAppLanguage() {
  
  const {userLanguage, userLanguageChange } = useContext(LanguageContext);
  
  const handleLanguageChange = (e) => {
    userLanguageChange(e.target.value);
  }


  return (
    <StyledButtonGroup
      value={userLanguage}
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <StyledButton key={id} value={id} sx={{fontFamily:'Bebas Neue', color:'#E50914'}} onClick={handleLanguageChange}>{name}</StyledButton>
      ))}
    </StyledButtonGroup>
  );
};