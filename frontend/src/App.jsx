import { Route, Routes } from "react-router-dom";
import UserHomePage from "./pages/user/UserHomePage/UserHomePage";
import UserSearchPage from "./pages/user/UserSearchPage/UserSearchPage";
import UserPostPage from "./pages/user/UserPostPage/UserPostPage";
import Navbar from "./components/Navbar/Navbar";
import { SearchProvider } from './context/SearchContext';
import { useState } from "react";
import UserLoginModal from "./pages/user/UserLoginModal/UserLoginModal";
import UserRegisterModal from "./pages/user/UserRegisterModal/UserRegisterModal";

export default function App() {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);

  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const openRegisterModal = () => {
    setRegisterModalVisible(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalVisible(false);
  };


  return (
    <>
      <Navbar openLoginModal={openLoginModal} openRegisterModal={openRegisterModal}/>
      <SearchProvider> 
        <Routes>
          <Route path="/"  element={<UserHomePage/>}/>
          <Route path="/search" element={<UserSearchPage/>}/>
          <Route path="/post/:id" element={<UserPostPage/>}/>
        </Routes>
      </SearchProvider>
      <UserLoginModal visible={isLoginModalVisible} onClose={closeLoginModal}/>
      <UserRegisterModal visible={isRegisterModalVisible} onClose={closeRegisterModal}/>
    </>
  );
}


