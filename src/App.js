import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider as NNStyledProvider } from 'styled-components';

import { LanguageProvider } from './context/LanguageContext';
import DataProvider from './context/DataContext';
import MovieList from './components/MovieList';
import NNTopBar from './components/appBar';
import theme from './theme/theme';


function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <StylesProvider injectFirst>
          <NNStyledProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <NNTopBar />
                <MovieList />   
              </CssBaseline>
            </ThemeProvider>
          </NNStyledProvider>
        </StylesProvider>
      </DataProvider>
    </LanguageProvider>   
  );
}
export default App;
