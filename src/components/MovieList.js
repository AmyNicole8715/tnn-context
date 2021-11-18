import { useState } from 'react';
import { Paper, Typography, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useGenres } from '../context/GenreContext';

const StyledPaper = styled(Paper)({
    padding: '1rem',
    margin: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'start',
    backgroundColor: '#171515',
    color: 'white',
    overflow: 'hidden',
    overflowX: 'scroll',
});

const StyledImg = styled('img')({
    width: '350px',
    height: 'auto',
});

const StyledDiv = styled('div')({
    position: 'relative',
    margin: '0',
    maxHeight: '525px',
    boxSizing: 'content-box',
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

const StyledPopover = styled(Popover)({
    backgroundColor: '#171515',
    color: 'white',
    padding: '1rem',
    margin: '1rem',
    display: 'flex',
    width: '400px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'start',
});


export default function MovieList() {
    const { movies } = useGenres();
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        console.log(event);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);

    return (
        <StyledPaper>
            {movies.map(movie => (
                <StyledDiv>
                    <StyledImg 
                        key={movie.id}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={() => handlePopoverOpen(movie.id)}
                        onMouseLeave={handlePopoverClose} 
                    />
                    <StyledSpan>
                        <Typography value={movie.id} variant="h6">
                            {movie.title}
                            ({movie.release_date})
                        </Typography>
                    </StyledSpan>
                    <StyledPopover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={movie.id === anchorEl}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                        <Typography variant="h6">
                            {movie.title}
                            ({movie.release_date})
                        </Typography>
                        <Typography variant="body1">
                            {movie.overview}
                        </Typography>
                    </StyledPopover>
                </StyledDiv>
            ))}
        </StyledPaper>
    );
};
  