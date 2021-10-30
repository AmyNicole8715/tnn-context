import { createTheme } from "@mui/material";
import "@fontsource/bebas-neue";
import "@fontsource/roboto"

// material-ui theme object

const theme = createTheme({
    palette: {
        primary: {
          light: '#4e4b4b',
          main: '#221F1F',
          dark: '#171515',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ea3a43',
          main: '#E50914',
          dark: '#a0060e',
          contrastText: '#fff',
        },
        background: {
          default: '#221F1F',
        }
      },
    typography: {
        fontFamily: ['Roboto',
        'Bebas Neue'
        ].join(',')
      }
    }
  
);
export default theme;