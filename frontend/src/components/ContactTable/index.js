import { useEffect, useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import apiconnection from "../../apiconnection";
import "./index.css";
import EditContact from "../EditContact";

const ContactTable = () => {
  const [api, setApi] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [DisplayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetch(`http://mernbackend.thorbergur.me:3450/api/contacts/${id}`, {
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
                    <EditContact
                      id={info._id}
                      name={info.name}
                      email={info.email}
                      phone={info.phone}
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
  }, [contacts]);

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
    </>
  );
};

export default ContactTable;
