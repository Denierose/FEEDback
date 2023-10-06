import "./FeedbackCard.css";
import { IoStarOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FeedbackCard = ({id,imgUrl,title, rating, location, status}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${id}`, {
      state: {
        imgUrl,
        title,
        rating,
        location,
        status,
      },
    });
  };

  return (
    <div className="feedBackCard" onClick={handleCardClick}>
      <img className="feedBackCardImage" src={imgUrl} alt='feedbackcardimage'/>
      <h1 className="feedBackCardTitle">{title}</h1>
      <div className="feedBackCardRating">
        <IoStarOutline/>
        <p>{rating} rating</p>
      </div>
      <div className="feedBackCardRow">
        <p className="feedBackCardLocation">{location}</p>
        <p className="feedBackCardStatus">{status}</p>
      </div>
    </div>
  )
}

export default FeedbackCard