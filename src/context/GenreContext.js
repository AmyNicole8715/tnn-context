import { useContext, useEffect, useReducer, createContext } from 'react';
import { useResource } from 'react-request-hook';

import { LanguageContext } from './LanguageContext';
import {
    SET_GENRES,
    SET_GENRE_ID,
    SET_GENRE_NAME,
} from '../actions/types';
import { reducer } from '../reducers/reducers';
import { TMDB_API_KEY } from '../apis/tmdb/key.js';

// Context for Genres


const initialState = {
    genres: [],
};

export const GenresContext = createContext({
    getGenres: () => {},
});

const GenresProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { userLanguage } = useContext(LanguageContext);

    const { genres, getGenres } = useResource(() => ({
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=${userLanguage}`,
        method: 'GET',
    }));

    useEffect(() => {
        if (genres) {
            dispatch({ type: SET_GENRES, payload: genres.genres });
        }
    }, [genres]);

    function handleId(id) {
        dispatch({ type: SET_GENRE_ID, payload: id });
    }

    const handleName = name => {
        dispatch({ type: SET_GENRE_NAME, payload: name });
    };




    return (
        <GenresContext.Provider
            value={{
                getGenres,
                genres,
                state,
                dispatch,
                handleId,
                handleName,
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