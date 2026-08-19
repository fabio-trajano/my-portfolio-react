import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';
import About from './components/about/About';
// import Skills from './components/skills/Skills';
import Services from './components/services/Services';
import Work from './components/Portfolio/Work';
import Contact from './components/contact/Contact';
import ScrollUp from './components/scrollup/ScrollUp';
import Qualification from './components/qualification/Qualification';
import EasterEggs from './components/easteregg/EasterEggs';

function App() {
  return (
    <>
     <Header />

     <main className='main'>
      <Home />
      <About />
      <Qualification />
      <Services />
      {/* <Skills /> */}
      <Work />
      <ScrollUp/>
      <Contact />
     </main>
     <EasterEggs />
    </>
  );
}

export default App;
