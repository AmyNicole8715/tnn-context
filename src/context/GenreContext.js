import { useState, useContext, useEffect, useReducer, createContext } from 'react';

import { LanguageContext } from './LanguageContext';
import {
    SET_GENRES,
    SET_GENRE_ID,
    SET_GENRE_NAME,
} from '../actions/types';
import { reducer } from '../reducers/reducers';
import { TMDB_API_KEY } from '../apis/tmdb/key.js';

const API_URL = 'https://api.themoviedb.org/3/';

// Context for Genres


const initialState = {
    genres: [],
};

export const GenresContext = createContext(initialState);

const GenresProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { dictionary } = useContext(LanguageContext);

    const fetchGenres = async url => {
        dispatch({ type: SET_GENRES, payload: [] });
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({ 
                type: SET_GENRES, 
                payload: data.genres 
            });
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        fetchGenres(`${API_URL}genre/movie/list?api_key=${TMDB_API_KEY}&language=${dictionary.setResultLang}`);
    }, [dictionary.setResultLang]);




    return (
        <GenresContext.Provider
            value={{
                ...state,
                fetchGenres,
            }}
        >
            {children}
        </GenresContext.Provider>
    );
};

export const useGenres = () => {
    return useContext(GenresContext);
};

export default GenresProvider;