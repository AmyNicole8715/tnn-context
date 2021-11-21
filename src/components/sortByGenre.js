import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'; 

import { useData } from '../context/DataContext';
import { Text } from '../context/LanguageContext.js';

// this needs to build menu from an array from genres.id and display genres.name in menu, and then sort movies by that, and then display the sorted movies
// it will need to upon selection also update the selected genre in the state

export default function GenreFilterMenu() {
  
  const { genres, userGenresChange } = useData();

  const doBothThings = (popupState, genres) => {
    popupState.close(genres.id)
    userGenresChange(genres.id)
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained"  {...bindTrigger(popupState)} >
            <Text tid="sortBy" />
          </Button>
          <Menu {...bindMenu(popupState)}> 
          {genres?.map((genres) => (
            <MenuItem key={genres.id} value={genres.id} onClick={() => doBothThings(popupState, genres)}>{genres.name}</MenuItem>
          ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

