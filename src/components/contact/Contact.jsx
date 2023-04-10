import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import "./contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_x1hewh5",
        "template_2ki8hlo",
        form.current,
        "vxDcl4UI2jbOQBn6f"
      )
      e.target.reset()
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Let's get in touch</h2>
      <span className="section__subtitle">-</span>

      <div className="contact__container container grid">
        <div className="contact__content">

          <div className="contact__info">
            <div className="contact__card">
              <i className="bx bx-mail-send contact__card-icon"></i>

              <h3 className="contact__card-title">Email</h3>
              <span className="contact__card-data">fabiotrajano.eng@gmail.com</span>

              <a
                href="mailto:fabiotrajano.eng@gmail.com.com"
                className="contact__button"
              >
                Write me{" "}
                <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="contact__content">

          <div className="contact__info">
            <div className="contact__card">
              <i className="bx bxl-whatsapp contact__card-icon"></i>

              <h3 className="contact__card-title">Whatsapp</h3>
              <span className="contact__card-data">+351 910 362 946</span>

              <a
                href="https://api.whatsapp.com/send?phone=351910362946&text=Hi Fabio!"
                className="contact__button"
              >
                Write me{" "}
                <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
