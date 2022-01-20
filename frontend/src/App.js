import React from "react";
import ContactTable from "./components/ContactTable";
import AddContact from "./components/AddContact";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="container">
        <ContactTable />
        <AddContact />
      </div>
    </>
  );
};

export default App;
