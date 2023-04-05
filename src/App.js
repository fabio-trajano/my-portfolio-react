import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import ScrollUp from './components/scrollup/ScrollUp';

function App() {
  return (
    <>
     <Header />

     <main className='main'>
      <Home />
      <About />
      <Skills />
      <ScrollUp/>
     </main>
    </>
  );
}

export default App;
