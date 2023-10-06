import "./Navbar.css";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { IoFastFoodOutline, IoSettingsOutline} from "react-icons/io5";


const Navbar = ({ openLoginModal, openRegisterModal }) => {
  const [authUser, setAuthUser] = useState(null);

  const handleLogout =  async () => {
    alert("Are you sure you want to logout?")
    await signOut(auth)
    localStorage.clear()
    setAuthUser(null);
  }

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      }
    });
    return () => {
      listen();
    };
  },[authUser]);

  return (
    <header className="navBar" >
      <Link to="/" className="logo">
          <div className="logo-icon">
            <IoFastFoodOutline/>
            <p>FEEDback</p>
          </div>
      </Link>
      <SearchBar/>
      <div className="settings">
      <IoSettingsOutline size={18}/>
      {
        authUser ?
        <>
          <img src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg" className="profile-pic" alt="profile-pic"/>          
          <Button variant="primary" onClick={handleLogout}>logout</Button>
        </> :
        <>
          <Button variant="primary" onClick={openLoginModal}>Login</Button>
          <Button variant="outline-primary" onClick={openRegisterModal}>Sign up</Button>
        </>
      }
      </div>
    </header>
  )
}

export default Navbar