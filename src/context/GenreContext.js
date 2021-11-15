import { useState, useContext, useEffect, useReducer, createContext } from 'react';

import { LanguageContext } from './LanguageContext';
import {
    SET_GENRES,
    SET_GENRE_ID,
    SET_MOVIES,
} from '../actions/types';
import { reducer } from '../reducers/reducers';
import { TMDB_API_KEY } from '../apis/tmdb/key.js';

const API_URL = 'https://api.themoviedb.org/3/';

// Context for Genres


const initialState = {
    genres: [],
    genreId: '',
    movies: [],
};

export const GenresContext = createContext();

export function GenresProvider ({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [genreId, setGenreId] = useState('');
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

    const userGenresChange = (selected) => {
            console.log(selected + ' selected')
            setGenreId(selected);
            dispatch ({ type: SET_GENRE_ID, payload: selected });
        };

    const fetchMovies = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({
                type: SET_MOVIES,
                payload: data.results
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (genreId !== '') {
            fetchMovies(`${API_URL}discover/movie?api_key=${TMDB_API_KEY}&language=${dictionary.setResultLang}&with_genres=${genreId}`);
        }
    }, [genreId, dictionary.setResultLang]);
    console.log(state);

    // const provider = {
    //     userLanguage,
    //     dictionary: dictionaryList[userLanguage],
    //     userLanguageChange: selected => {
    //       const newLanguage = languageOptions[selected] ? selected : 'enUS'
    //       setUserLanguage(newLanguage);
    //       window.localStorage.setItem('rcml-lang', newLanguage);
    //     }
    //   };



    return (
        <GenresContext.Provider
            value={{
                ...state,
                fetchGenres,
                userGenresChange,
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