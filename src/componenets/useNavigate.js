import React from "react";
import { useNavigate } from "react-router-dom";
import AddContact from "./AddContact";

const AddContactWrapper = (props) => {
  const navigate = useNavigate();
  return <AddContact {...props} navigate={navigate} />;
};

export default AddContactWrapper;
