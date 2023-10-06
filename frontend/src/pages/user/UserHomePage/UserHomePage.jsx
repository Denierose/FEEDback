import FeedbackCard from "../../../components/FeedbackCard/FeedbackCard";
import "./UserHomePage.css";
import { useSearchContext } from "../../../context/SearchContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const UserHomePage = () => {
  const {
    typeFilter,
    ratingFilter,
    handleTypeFilterChange,
    handleRatingFilterChange,
    sortedData,
    iframeSearchQuery,
  } = useSearchContext(); 
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [authUser, setAuthUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    axios
    .get(`http://localhost:3001/user/getOne/${authUser ? authUser.email :  ""}`)
    .then((response) => {
      const userData = response.data;
      setUserInfo(userData);
    })
    .catch((error) => {
      console.error('Error fetching user information:', error);
    });
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      }
    });

    return () => {
      listen();
    };
  },[userInfo, authUser])

  return (
    <div className="PageContainer UserHomePage">
      <div className="content">

        <h1 className="title">{userInfo ? `Hi there, ${userInfo.firstName} ${userInfo.lastName}!` : "Login first!"}</h1>
        <div className="filters">
          <select value={typeFilter} onChange={handleTypeFilterChange}>
            <option value="All">All Items</option>
            <option value="Foods">Foods</option>
            <option value="Beverages">Beverages</option>
          </select>
          <select value={ratingFilter} onChange={handleRatingFilterChange}>
            <option value="All">All Rating</option>
            <option value="LowToHigh">Rating Low to High</option>
            <option value="HighToLow">Rating High to Low</option>
          </select>
        </div>

        <main>
          {sortedData.length === 0 ? (
            <p>Sorry we cannot find the item for "{searchQuery}".</p>
          ) : (
            sortedData.map((feedback, index) => (
              <FeedbackCard
                id={feedback._id}
                key={index}
                imgUrl={feedback.imgUrl}
                title={feedback.title}
                rating={feedback.averageRating}
                location={feedback.location}
                status={feedback.status}
              />
            ))
          )}
        </main>
      </div>
      <div className="gmap">
        <iframe
          title="gmap"
          id="gmap_canvas"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(iframeSearchQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        />
      </div>
    </div>
  );
};

export default UserHomePage;
