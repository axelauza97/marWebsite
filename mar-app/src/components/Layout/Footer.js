import { useRef, useState } from "react";

import Input from "../UI/Input";
import classes from "./Footer.module.css";
const Footer = () => {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const [contactInput, setcontactInput] = useState("EMAIL");
  const messageInputRef = useRef();
  const newsInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    alert(
      `Form was sucessfully sent!` +
        `\nName: ` +
        nameInputRef.current.value +
        `\nPhone: ` +
        phoneInputRef.current.value +
        `\nEmail: ` +
        emailInputRef.current.value +
        `\nContact: ` +
        contactInput +
        `\nMessage: ` +
        messageInputRef.current.value +
        `\nNewsletter: ` +
        newsInputRef.current.checked
    );
  };
  const onContactChange = (event) => {
    setcontactInput(event.target.value);
  };
  return (
    <footer className={classes.footer}>
      <section className={classes.form}>
        <div className={classes.form_container}>
          <h3> Got questions ? Get in touch </h3>
          <p>
            If you 'd like more information about any of our trips, please reach
            out and we will contact you promptly.And while you 're at it, signup
            for our newsletter to stay informed on all the latest MAR
            adventures, research and awesome images that we 've captured along
            the way.
          </p>
          <form onSubmit={submitHandler}>
            <Input
              ref={nameInputRef}
              label="Your Name:"
              input={{
                id: "name",
                type: "text",
              }}
            />
            <Input
              ref={phoneInputRef}
              label="Phone:"
              input={{
                id: "phone",
                type: "number",
              }}
            />
            <Input
              ref={emailInputRef}
              label="Email: "
              input={{
                id: "email",
                type: "email",
              }}
            />

            <div className={classes.input_contact}>
              <label> Preferred method of contact </label>
              <div className={classes.container}>
                <Input
                  state={contactInput}
                  label="Email"
                  onChange={onContactChange}
                  input={{
                    value: "EMAIL",
                    type: "radio",
                    name: "contact",
                    id: "emailContact",
                  }}
                />

                <Input
                  state={contactInput}
                  label="Phone"
                  onChange={onContactChange}
                  input={{
                    value: "PHONE",
                    type: "radio",
                    name: "contact",
                    id: "phoneContact",
                  }}
                />

                <Input
                  state={contactInput}
                  label="Text"
                  onChange={onContactChange}
                  input={{
                    value: "TEXT",
                    type: "radio",
                    name: "contact",
                    id: "textContact",
                  }}
                />
              </div>
            </div>
            <Input
              ref={messageInputRef}
              label="Your Message / Question: "
              input={{
                id: "message",
                rows: 3,
                type: "textarea",
              }}
            />
            <Input
              ref={newsInputRef}
              label="Sign up for our newsletter!"
              input={{
                id: "news",
                type: "checkbox",
              }}
            />
            <button className={classes.form_button}>Send Request!</button>
          </form>
        </div>
      </section>
      <section className={classes.social}>
        <div className={classes.social_container}>
          <h3> Lets be Social - connect with us! </h3>
          <div className={classes.social_buttons}>
            <a>
              <i className={classes.fab + ` fab fa-instagram`}> </i>
            </a>
            <a>
              <i className={classes.fab + ` fab fa-youtube`}> </i>
            </a>
            <a>
              <i className={classes.fab + ` fab fa-linkedin-in`}> </i>
            </a>
            <a>
              <i className={classes.fab + ` fab fa-facebook-f`}> </i>
            </a>
            <a>
              <i className={classes.fab + ` fab fa-twitter`}> </i>
            </a>
          </div>
        </div>
      </section>
      <section className={classes.contact}>
        <div className={classes.contact_container}>
          <h3> Contact Information </h3> <div> Phone: 123 - 456 - 7890 </div>
          <div> Email: axelauza97 @hotmail.com </div>
          <div> Address: 1234 Ocean Ave </div> <div> Axel Auza A @2023 </div>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
