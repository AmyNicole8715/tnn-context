import {
    SET_GENRES,
    SET_GENRE,
    SET_GENRE_ID,
    SET_GENRE_NAME,
    SET_MOVIES,
    SET_MOVIE,
    SET_MOVIE_ID,
    SET_MOVIE_NAME,
} from '../actions/types';

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case SET_GENRES:
            return { ...state, genres: action.payload };
        case SET_GENRE:
            return { ...state, genre: action.payload };
        case SET_GENRE_ID:
            return { ...state, genreId: action.payload };
        case SET_GENRE_NAME:
            return { ...state, genreName: action.payload };
        case SET_MOVIES:
            return { ...state, movies: action.payload };
        case SET_MOVIE:
            return { ...state, movie: action.payload };
        case SET_MOVIE_ID:
            return { ...state, movieId: action.payload };
        case SET_MOVIE_NAME:
            return { ...state, movieName: action.payload };
        default:
            return state;
    }
};