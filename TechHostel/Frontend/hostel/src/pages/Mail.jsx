import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "../css/register.css"
import "../css/register.css"
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";


const Mail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_srej0q7', 'template_mw4kvns', form.current, {
        publicKey: 'c2fCQ0NOV-DiSYF3t',
      })
      .then(
        () => {
          alert("Mail Sent Successfully");
          console.log('SUCCESS!');
          form.current.reset(); // Reset form after success
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Mail Not Sent Successfully");
        },
      );
  };

  return (
    <>
      <Navbar2/><br/><br/><br/><br/>
      <div className="container">
        <div className="inquiryMessage">
          <form ref={form} onSubmit={sendEmail}>
            <fieldset>
              <legend>Send mail:</legend>
              
              <label>Name</label>
              <input type="text" name="user_name" required />
              
              <label>Email</label>
              <input type="email" name="user_email" required />
              
              <label>Subject</label>
              <input type="text" name="subject" required />
              
              <label>Message</label>
              <textarea name="message" required rows="5" />
              
              <input className="btnbt" type="submit" value="Send" />
            </fieldset>
          </form>
        </div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </>
  );
};

export default Mail;