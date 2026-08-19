import React from "react";
import "./home.css"
import Arcade from "../game/Arcade";

const Social = () => {
  return (
    <div className="home__social">
      <a href="https://github.com/fabio-trajano" rel="noreferrer" className="home__social-icon" target="_blank"><i className="uil uil-github-alt"></i></a>
      <a href="https://linkedin.com/in/fabio-trajano/" rel="noreferrer" className="home__social-icon" target="_blank"><i className="uil uil-linkedin-alt"></i></a>
      <a href="https://www.instagram.com/fabiotrajanor/" rel="noreferrer" className="home__social-icon" target="_blank"><i className="uil uil-instagram"></i></a>
      <Arcade />
    </div>
  )
}

export default Social
