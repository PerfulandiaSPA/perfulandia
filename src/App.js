import React from 'react';

import AppRoutes from './app/AppRoutes'; // ✅ ruta corregida
import NavBar from './components/NavBar';


function App() {
  return (
    <div className='App'>
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
