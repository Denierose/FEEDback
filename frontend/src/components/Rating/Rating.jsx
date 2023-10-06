import { IoStar } from "react-icons/io5";

const Rating = ({ userRating, setUserRating }) => {
  const handleClick = (rating) => {
    setUserRating(rating);
  };

  return (
    <div className="Rating">
      {[1, 2, 3, 4, 5].map((rating) => (
        <IoStar
          key={rating}
          className={`star ${rating <= userRating ? 'checked' : ''}`}
          onClick={() => handleClick(rating)}
        />
      ))}
    </div>
  );
};

export default Rating;
