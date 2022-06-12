import React, { useState } from "react";
import "./Css/main.css"
import { db } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faLinkedin, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEnvelope, faMapMarker, faPhone, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
function App() {

  const [values, setValue] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // handle lable of input 

  function labelset(event, label) {
    if (event.target.value == "") {
      label.classList.remove("label-top");
    }
    else {
      label.classList.add("label-top");
    }
  }

  // handle Name Change 

  function handleName(event) {
    setValue({ ...values, name: event.target.value })
    const label = document.querySelector(".label1");
    labelset(event, label);
  }

  // handle Email change 
  function handleEmail(event) {
    setValue({ ...values, email: event.target.value.trim() })
    const label = document.querySelector(".label2");
    labelset(event, label);
  }

  // handle contact change 
  function handleContact(event) {
    setValue({ ...values, contact: event.target.value.trim() })
    const label = document.querySelector(".label3");
    labelset(event, label);
  }

  // handle subject change 
  function handleSubject(event) {
    setValue({ ...values, subject: event.target.value.trim() })
    const label = document.querySelector(".label4");
    labelset(event, label);
  }

  // handle message change 
  function handleMessage(event) {
    setValue({ ...values, message: event.target.value.trim() })
    const label = document.querySelector(".label5");
    if (values.message != "") {
      label.innerHTML = "";
    }
    else {
      toast.info(`Enter The Message`, {
        position: "top-right",
        theme: "dark",
      });
    }
  }



  // function to call validate inputs 

  function check() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const number = document.getElementById("number");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    if (checkEmpty(name) + checkEmail(email) + checkEmpty(number) + checkEmpty(subject) + checkEmpty(message) == 5) {
      return true;
    }
    else {
      return false;
    }

  };

  // function to check if input is empty or not  and sending error

  function checkEmpty(type) {
    const form = type.parentElement;
    const error = form.querySelector(".error-text");

    if (type.value == "") {
      form.className = "group error";
      toast.error(`${type.name} cannot be blank`, {
        position: "top-right",
        theme: "colored",
      });
      return false;
    }
    else {
      form.className = "group success";
      return true;
    }
  }

  // function to validate mail type 

  function checkEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const form = mail.parentElement;

    if (!checkEmpty(mail)) {

      return false;
    }

    else if (mail.value.match(mailformat)) {
      return true;
    }
    else {
      toast.error('Invalid Email Address', {
        position: "top-right",
        theme: "dark",
      });
      form.className = "group error";
      return false;
    }
  }

  // handling submit 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (check()) {
      setLoading(true);
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: values.name,
          email: values.email,
          contact: values.contact,
          subject: values.subject,
          message: values.message
        });

        const div = document.getElementsByClassName("group");

        for (let i = 0; i < 5; i++) {
          div[i].className = "group";
        }

        toast.success('Form Submitted Successfully', {
          position: "top-center",
          theme: "dark",
        });
        setValue({ ...values, name: "", message: "", email: "", contact: "", subject: "" });
        setLoading(false);

      } catch (e) {
        alert(e.message);
      }
    }
  };


  return (
    <>
      <div className="contact_form">
        <div className="box">
          <div className="left">
            <h3 className="heading">Contact Info</h3>
            <hr />
            <div>
              <small className="light-grey">
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                NAME
              </small>
              <p>Nikhil Aggarwal</p>
            </div>
            <div>
              <small className="light-grey">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                EMAIL
              </small>
              <p>nikhil.aggarwal.ece21@itbhu.ac.in</p>
            </div>
            <div>
              <small className="light-grey">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                Contact
              </small>
              <p>9899502120</p>
            </div>
            <div>
              <small className="light-grey">
                <FontAwesomeIcon icon={faMapMarker} className="mr-3" />
                ADDRESS
              </small>
              <p>Banaras Hindu University</p>
            </div>

            <div className="left_footer">
              <a href="/"><FontAwesomeIcon icon={faInstagram} className="mr-3" /></a>
              <a href="/"><FontAwesomeIcon icon={faFacebook} className="mr-3" /></a>
              <a href="/"><FontAwesomeIcon icon={faLinkedin} className="mr-3" /></a>
              <a href="/"><FontAwesomeIcon icon={faTwitter} className="mr-3" /></a>
              <a href="/"><FontAwesomeIcon icon={faGithub} className="mr-3" /></a>
            </div>
          </div>
          <div className="right" >
            <h3 className="heading1">Contact Us</h3>
            <hr />

            <form onSubmit={handleSubmit}>
              <div className="group">
                <input type="text" name="name" value={values.name} id="name" onChange={handleName} />
                <label htmlFor="name" className="label1">Name</label>
                <FontAwesomeIcon icon={faExclamationCircle} className="exclamation" />
                <FontAwesomeIcon icon={faCheckCircle} className="check" />
              </div>
              <div className="group">
                <input type="email" name="email" id="email" value={values.email} onChange={handleEmail} />
                <label htmlFor="email" className="label2">Email</label>
                <FontAwesomeIcon icon={faExclamationCircle} className="exclamation" />
                <FontAwesomeIcon icon={faCheckCircle} className="check" />


              </div>
              <div className="group">
                <input type="number" name="number" id="number" value={values.contact} onChange={handleContact} />
                <label htmlFor="number" className="label3">Contact</label>
                <FontAwesomeIcon icon={faExclamationCircle} className="exclamation" />
                <FontAwesomeIcon icon={faCheckCircle} className="check" />

              </div>
              <div className="group">
                <input type="text" name="subject" id="subject" value={values.subject} onChange={handleSubject} />
                <label htmlFor="subject" className="label4">Subject</label>
                <FontAwesomeIcon icon={faExclamationCircle} className="exclamation" />
                <FontAwesomeIcon icon={faCheckCircle} className="check" />

              </div>
              <div className="group">
                <textarea rows={5} type="text" name="message" id="message" value={values.message} onChange={handleMessage} />
                <label htmlFor="message" className="label5">Message</label>
                <FontAwesomeIcon icon={faExclamationCircle} className="exclamation" />
                <FontAwesomeIcon icon={faCheckCircle} className="check" />


              </div>
              <button className="submit" type="submit" disabled={loading} >SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
