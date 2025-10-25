import React from 'react';

import AppRoutes from './app/AppRoutes';
import NavBar from './components/NavBar';
import { AppProvider } from './context/AppContext';


function App() {
  return (
    <div className='App'>
      {/* AppProvider Engloba todas las pantallas lo que quiere decir que es una funcion Global */}
      <AppProvider>
        <NavBar />
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
