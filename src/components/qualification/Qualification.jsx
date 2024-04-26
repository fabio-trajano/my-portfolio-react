import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(2);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="qualification section">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={
              toggleState === 1
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>
            Experience
          </div>
        </div>

        <div className="qualification__sections">
          <div
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Back-End Developer</h3>
                <span className="qualification__subtitle">
                  Meta Certification
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> May/2023
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">Web Development Bootcamp</h3>
                <span className="qualification__subtitle">
                  Le Wagon
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> March/2023
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">MSc in Gastronomic Sciences.</h3>
                <span className="qualification__subtitle">
                  Universidade do Porto
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> 2020 - 2023
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                {/* <span className="qualification__line"></span> */}
              </div>
            </div>

            {/* <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
              </div>

              <div>
                <h3 className="qualification__title">Mba Gastronomy</h3>
                <span className="qualification__subtitle">
                  PUCRS - Brazil
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> 2017 - 2018
                </div>
              </div>
            </div> */}
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">Backend Software Developer Intern</h3>
                <span className="qualification__subtitle">
                  Blip.pt | Fanduel
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> Sept/23 - Present
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Web Developer</h3>
                <span className="qualification__subtitle">
                  Freelance
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> April/23 - Sept/23
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">Cook</h3>
                <span className="qualification__subtitle">
                  Hilton Hotels - Porto
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> 2021 - 2022
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Restaurant Managing Partner</h3>
                <span className="qualification__subtitle">ILB Restaurant</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> 2015 - 2018
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">Research Assistant</h3>
                <span className="qualification__subtitle">Sinton Microfluidics at University of Toronto </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> 2013
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Project Manager Intern</h3>
                <span className="qualification__subtitle">Armtec Robotics</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> 2010 - 2012
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                {/* <span className="qualification__line"></span> */}
              </div>
            </div>


          </div>
          <span className="moreinfo__section">* More info about my experience and trainnings on my <a href="https://www.linkedin.com/in/fabio-trajano/" target="_blank">Linkedin</a></span>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
