import * as React from 'react';
import { useContext, useEffect, useReducer } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useResource } from 'react-request-hook';
import { languageOptions } from './languages/index.js'; 
import { Text, LanguageContext } from '../context/Language.js';

import { TMDB_API_KEY } from '../apis/tmdb/key.js';

// sortGenre needs set the parameter of rtk query
// this needs to build menu from an array from genres.id and display genres.name in menu, and then sort movies by that, and then display the sorted movies
// it will need to upon selection also update the selected genre in the state

export default function SortByMenu() {
  const initialState = {
    genres: [],
    selectedGenre: null,
  };
  
  const { dictionary } = useContext(LanguageContext);
  const resultLanguage = dictionary.setResultLang;
  
  

  const appReducer = (state, action) => {
    switch (action.type) {
      case 'SET_GENRES':
        return { ...state, genres: action.payload };
        default:
          return state;
        }
      };
      
      const [state, dispatch] = useReducer(appReducer, initialState);
      const { genres } = state;


      
  const [genre, getGenres] = useResource(() => ({
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=${resultLanguage}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }));
  useEffect(getGenres, []);
  useEffect(() => {
    if (genre.data) {
      dispatch({ type: 'SET_GENRES', payload: genre.data.genres });
    }
  }, [genre]);






  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)} >
            <Text tid="sortBy" />
          </Button>
          <Menu {...bindMenu(popupState)}> 
            <MenuItem onClick={popupState.close}>Popularity</MenuItem>
            <MenuItem onClick={popupState.close}>Action</MenuItem>
            <MenuItem onClick={popupState.close}>Comedy</MenuItem>
            <MenuItem onClick={popupState.close}>Horror</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

{/* <StyledButtonGroup
      value={userLanguage}
    >
      {Object.entries(genres).map(([id, name]) => (
        <StyledButton key={id} value={id} sx={{fontFamily:'Bebas Neue', color:'#E50914'}}>{name}</StyledButton>
      ))} */}