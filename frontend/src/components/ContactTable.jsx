import {useEffect, useState, React} from 'react'
import apiconnection from '../apiconnection';

const ContactTable = () => {

  const [api, setApi] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [DisplayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiRes = apiconnection
    setApi(apiRes);
    if (api != null) {
      api.then(res => {
        setContacts(res)
      })
    }
  }, [api]);

  useEffect(()=>{
      setDisplayData(contacts? contacts.map((info) => {
        return (
          <tr key={info._id}>
            <td>{info.name}</td>
            <td>{info.email}</td>
            <td>{info.phone}</td>
          </tr>
        );
      }): "nothing to display");
      setLoading(false)
      
  }, [contacts])
  
  if (loading) return "loading..."

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </>
  );
}

export default ContactTable
