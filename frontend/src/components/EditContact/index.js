import { useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./editContact.css";

const Modal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const patchData = (name, email, phone) => {
    const data = new URLSearchParams({
      name: name,
      email: email,
      phone: phone,
    });

    fetch(`http://localhost:8080/api/contacts/${props.id}`, {
      method: "PATCH",
      body: data,
    });
  };

  return (
    <>
      <div
        className="modal"
        style={{ display: props.active ? "block" : "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={props.func}>
            &times;
          </span>
          <p>Edit {props.name}</p>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                defaultValue={props.name}
                placeholder="Full name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                email="email"
                defaultValue={props.email}
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                phone="phone"
                defaultValue={props.phone}
                placeholder="+354 123 4567"
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <input
              type="submit"
              value="Submit"
              className="btn"
              onClick={() => patchData(name, email, phone)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

const EditContact = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <FontAwesomeIcon
        icon={faEdit}
        className="icon"
        onClick={() => {
          openModal();
        }}
      />
      <Modal
        active={showModal}
        func={closeModal}
        name={props.name}
        email={props.email}
        phone={props.phone}
        id={props.id}
      />
    </>
  );
};

export default EditContact;
