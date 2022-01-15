import { useState, React } from "react";

import "./addContact.css";

const Modal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const postData = (name, email, phone) => {
    const data = new URLSearchParams({
      name: name,
      email: email,
      phone: phone,
    });

    fetch("http://localhost:8080/api/contacts", {
      method: "POST",
      body: data,
    });
  };

  return (
    <>
      <div
        className="modal"
        style={{ display: +props.active ? "block" : "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={props.func}>
            &times;
          </span>
          <p>Create a new contact</p>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                placeholder="Full name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                email="email"
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                phone="phone"
                placeholder="+354 123 4567"
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <input
              type="submit"
              value="Submit"
              className="btn"
              onClick={() => postData(name, email, phone)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

const AddContact = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button onClick={openModal} className="btn">
        Add contact
      </button>
      <Modal active={showModal} func={closeModal} />
    </>
  );
};

export default AddContact;
