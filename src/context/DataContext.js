import { useState, useContext, useEffect, useReducer, createContext } from 'react';

import { LanguageContext } from './LanguageContext';
import {
    SET_GENRES,
    SET_GENRE_ID,
    SET_MOVIES,
    SET_MOVIE_TITLE,
    SET_MOVIE_TRAILER,
} from '../actions/types';
import { reducer } from '../reducers/reducers';
import { TMDB_API_KEY } from '../apis/tmdb/key.js';
import youtube from '../apis/youtube/youtube';

const API_URL = 'https://api.themoviedb.org/3/';


// Context for Genres
const initialState = {
    genres: [],
    genreId: '',
    movies: [],
    movieTitle: '',
    movieTrailer: '',
};

export const DataContext = createContext();

export function DataProvider ({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [genreId, setGenreId] = useState('');
    const [movieTitle, setMovieTitle] = useState('');
    const { dictionary } = useContext(LanguageContext);

    // fetch genres using TMDB API and selected language
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

    // fetch movies from TMDB
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

    // change movie title for youtube search
    const movieTitleChange = (selected) => {
        console.log(selected + ' selected')
        setMovieTitle(selected + ` ${dictionary.language} trailer`);
        dispatch ({ type: SET_MOVIE_TITLE, payload: selected });
    };

    // fetches movie trailer from youtube
    const fetchMovieTrailer = async (term) => {
        try {
            const response = await youtube.get('/search', {
                params: {
                    q: term,
                    },
                });
            dispatch({
                type: SET_MOVIE_TRAILER,
                payload: response.data.items[0].id.videoId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // checks if movie title is empty if not, then it fetches movie trailer
    useEffect(() => {
        if (movieTitle !== '') {
            fetchMovieTrailer(movieTitle);
        }
    }, [movieTitle]);



    return (
        <DataContext.Provider
            value={{
                ...state,
                fetchGenres,
                userGenresChange,
                movieTitleChange,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};

export default DataProvider;