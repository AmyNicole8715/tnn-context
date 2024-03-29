import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Paper, Typography, Popover, Tabs, Tab } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { useData } from '../context/DataContext';



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
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
});

const StyledImg = styled('img')({
    width: '350px',
    height: 'auto',
    backgroundSize: 'contain',
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
    marginTop: '4rem',
    display: 'flex',
    width: '400px',
    height: '500px',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
});


export default function MovieList() {
    const ref = useRef(null);
    const { theme } = useTheme();
    const { movies, movieTitleChange, movieTrailer } = useData();
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleMovieTitle = (event) => {
    //     movieTitleChange(event);
    // };

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    const handleMovieTrailer = (id, title) => {
        movieTitleChange(title);
        setAnchorEl(id);
    };

    // const handlePopoverOpen = (event) => {
    //     console.log(event);
    //     setAnchorEl(event);
    // };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);

    return (
        <StyledPaper ref={ref}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                >
            
            {movies.map(movie => (
                <StyledDiv>
                    <StyledImg 
                        key={movie.id}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title}
                        value={movie.title} // is this what is needed to pass title to the popover and thus trailer?
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onClick={() => handleMovieTrailer(movie.id, movie.title)}
                        onDoubleClick={() => handlePopoverClose(movie.id)} 
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
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        onDoubleClick={() => handlePopoverClose(movie.id)}
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
                        <Typography variant="h4" sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontFamily: 'Bebas Neue',
                        }}>
                            {movie.title}
                            ({movie.release_date})
                        </Typography>
                        <Typography variant="h6" sx={{ 
                                backgroundColor:'primary.main',
                                color: 'primary.contrastText',
                                fontFamily: 'Roboto',
                            }}>
                            {movie.overview}
                        </Typography>
                    </StyledPopover>
                </StyledDiv>
            ))}
            </Tabs>
        </StyledPaper>
    );
};
  