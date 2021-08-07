import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { themes } from './themes';

export const ThemeProvider = props => {
  return (
    <OriginalThemeProvider theme={themes.mongoDBTheme}>
      {props.children}
    </OriginalThemeProvider>
  );
};
