import { useState } from 'react';
import ReactPlayer from 'react-player';
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
    position: 'relative',
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
    padding: '2rem',
    margin: '2rem',
    display: 'flex',
    width: '400px',
    height: '750px',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
});


export default function MovieList() {
    const { movies, movieTitleChange, movieTrailer } = useGenres();
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMovieTitle = (event) => {
        movieTitleChange(event);
    };


    const handlePopoverOpen = (event) => {
        console.log(event);
        setAnchorEl(event);
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
                        value={movie.title} // is this what is needed to pass title to the popover and thus trailer?
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={() => handlePopoverOpen(movie.id)}
                        onMouseOver={() => handleMovieTitle(movie.title)}
                        onMouseLeave={() => handlePopoverClose(movie.id)} 
                    />
                    <StyledSpan>
                        <Typography value={movie.id} variant="h6">
                            {movie.title}
                            ({movie.release_date})
                        </Typography>
                    </StyledSpan>
                    <StyledPopover
                        value={movie.title}
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
                        onMouseLeave={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${movieTrailer}`}
                            height='100%'
                            width='max-width'
                            controls={true}
                            playing={true}
                            loop={true}
                            volume={0.5}
                        />
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
  