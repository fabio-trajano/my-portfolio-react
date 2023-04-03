import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';

function App() {
  return (
    <>
     <Header />

     <main className='home'>
      <Home />
     </main>
    </>
  );
}

export default App;
