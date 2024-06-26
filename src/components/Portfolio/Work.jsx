import React from "react";
import "./work.css";
import Works from "./Works";

const Work = () => {
  return (
    <section class="work section" id="portfolio">
      <h2 class="section__title">Portfolio</h2>
      <span class="section__subtitle">
       For my complete portfolio, check out my <a href="https://github.com/fabio-trajano/" target="_blank" rel="noopener noreferrer" className="custom__link">GitHub</a> page
      </span>
      <Works />
    </section>
  );
};

export default Work;
