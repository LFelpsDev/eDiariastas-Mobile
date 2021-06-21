import React from 'react';
import AppTheme from './app-theme'
import { Provider as PaperProvioder } from 'react-native-paper'
import { ThemeProvider as EmotionProvider } from '@emotion/react';

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <EmotionProvider theme={AppTheme}>
      <PaperProvioder theme={AppTheme}>
        {children}
      </PaperProvioder>
    </EmotionProvider>
  );
};

export default ThemeProvider;