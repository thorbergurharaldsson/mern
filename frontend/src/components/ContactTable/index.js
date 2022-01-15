import { useEffect, useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

import apiconnection from "../../apiconnection";
import "./index.css";
import EditContact from "../EditContact";

const ContactTable = () => {
  const [api, setApi] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [DisplayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [contactID, setContactID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    const apiRes = apiconnection;
    setApi(apiRes);
    if (api != null) {
      api.then((res) => {
        // sort alphabetically by name
        res.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setContacts(res);
      });
    }
  }, [api]);

  const deleteContact = (id) => {
    fetch(`http://localhost:8080/api/contacts/${id}`, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    setDisplayData(
      contacts ? (
        contacts.map((info) => {
          return (
            <tr key={info._id}>
              <td>{info.name}</td>
              <td>{info.email}</td>
              <td>{info.phone}</td>
              <td className="icons">
                {
                  <>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="icon"
                      onClick={() => {
                        deleteContact(info._id);
                        window.location.reload(false);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="icon"
                      onClick={() => {
                        setContactID(info.id);
                        setName(info.name);
                        setEmail(info.email);
                        setPhone(info.phone);
                        setEditModal(true);
                      }}
                    />
                  </>
                }
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td>nothing to display</td>
        </tr>
      )
    );
    setLoading(false);
  }, [contacts, editModal]);

  if (loading) return "loading...";

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
      <EditContact
        id={contactID}
        name={name}
        email={email}
        phone={phone}
        active={editModal}
      />
    </>
  );
};

export default ContactTable;
