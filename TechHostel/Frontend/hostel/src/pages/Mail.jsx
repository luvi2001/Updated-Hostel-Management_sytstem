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
      .sendForm('service_654wuf8', 'template_v91j7gz', form.current, {
        publicKey: 'yDQDzee__JRz8vnuU',
      })
      .then(
        () => {
          alert("Mail Sent Successfully");
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Mail Not Send Successfully");
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
              <input type="text" name="user_name"/>
              <label>Mail description</label>
              <textarea name="message"   />
              <input className="btnbt" type="submit" value="Send"  />
            </fieldset>
          </form>
        </div>
      </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </>
   
  );
};

export default Mail;