// In App.js in a new project

import * as React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Router } from './src/router';

import { Auth } from './src/hooks/auth';

import { ThemeContextProvider } from './src/hooks/themeContext';

import { ThemeContext } from './src/hooks/themeContext';
// import { Theme } from './src/services/theme';
function App() {
  return (
    <NavigationContainer>
      <ThemeContextProvider>
        {/* <Theme> */}
        <Auth>
          <Router />
        </Auth>
        {/* </Theme> */}
      </ThemeContextProvider>
    </NavigationContainer>
  );
}

export default App;