import React, { useContext } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import ParkingService, { CLIENT_PATH, SERVER_PATH } from "../service/ParkingService";
import DefaultLayout, { LoginContext } from "./DefaultLayout";

const Signout = () => {

  const history = useNavigate()
  const { login, setLogin } = useContext(LoginContext);

  function handleRemoveToken(){
    localStorage.removeItem("jwt")
    window.location.href = "http://localhost:3000/"
    history("/")

    return "1234"
  }

  return (
    <div>
      {handleRemoveToken()}
    </div>
  );
};

export default Signout;