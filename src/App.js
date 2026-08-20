import React, { useEffect } from 'react';
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
  // Reveal each section as it scrolls into view.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.section'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((section) => {
      section.classList.add('reveal');
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

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
