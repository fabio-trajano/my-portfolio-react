import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Work from './components/Portfolio/Work';
import Contact from './components/contact/Contact';
import ScrollUp from './components/scrollup/ScrollUp';

function App() {
  return (
    <>
     <Header />

     <main className='main'>
      <Home />
      <About />
      <Skills />
      <Work />
      <ScrollUp/>
      <Contact />
     </main>
    </>
  );
}

export default App;
