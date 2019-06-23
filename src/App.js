import React from 'react';
import AppRouter from './Router';
import { initializeFirebase } from './services';

initializeFirebase();

function App() {
  return (
    <AppRouter /> 
  );
}

export default App;