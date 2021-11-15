import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useGenres } from '../context/GenreContext';

const StyledPaper = styled(Paper)({
    padding: '1rem',
    margin: '1rem',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'start',
    backgroundColor: '#171515',
    color: 'white',
});

const StyledImg = styled('img')({
    width: '150px',
    height: 'auto',
});

const StyledDiv = styled('div')({
    position: 'relative',
    margin: '0',
    maxHeight: '525px',
    overflow: 'hidden',
    '&:hover': {
        cursor: 'pointer',
    },
});

const StyledSpan = styled('span')({
    position: 'absolute',
    top: '100',
    left: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
});

export default function MovieList() {
    const { movies } = useGenres();
    
    return (
        <StyledPaper>
            {movies.map(movie => (
                <StyledDiv>
                    <StyledImg src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <StyledSpan>
                        <Typography key={movie.id} variant="h6">
                            {movie.title}
                            ({movie.release_date})
                        </Typography>
                    </StyledSpan>
                </StyledDiv>
            ))}
        </StyledPaper>
    );
};
  