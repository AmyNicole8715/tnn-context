import React from 'react';
import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider as NNStyledProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';

import { Text, LanguageProvider } from './context/LanguageContext';
import GenresProvider from './context/GenreContext';

import NNTopBar from './components/appBar';
import theme from './theme/theme';


function App() {
  return (
    <LanguageProvider>
      <GenresProvider>
        <StylesProvider injectFirst>
          <NNStyledProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <NNTopBar />
                <Text tid="changeLanguage"/>
              </CssBaseline>
            </ThemeProvider>
          </NNStyledProvider>
        </StylesProvider>
      </GenresProvider>
    </LanguageProvider>   
  );
}
export default App;
