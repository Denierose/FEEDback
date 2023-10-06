import "./UserPostPage.css";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from "../../../config/firebase";
import { IoLocationSharp, IoChatbubbleOutline, IoTimeSharp, IoStarOutline } from 'react-icons/io5';
import { onAuthStateChanged } from "firebase/auth";
import { Rating } from 'react-simple-star-rating'
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import CommentCard from '../../../components/CommentCard/CommentCard';
import axios from 'axios';

const UserPostPage = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [rating, setRating] = useState(0)
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

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

    axios
      .get(`http://localhost:3001/review/getOneReview/${id}`)
      .then((response) => {
        setReviewData(response.data);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error('Error fetching review data:', error);
      });

    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      }
    });

    return () => {
      listen();
    };
  }, [id, comments, authUser, userInfo]);

  const handleCommentSubmit = async () => {
    if (authUser) {
      const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
      await axios
        .put(`http://localhost:3001/review/createComment/${id}`, {
          user: fullName,
          content: commentInput,
        })
        .then((response) => {
          console.log('Comment created:', response.data);
        })
        .catch((error) => {
          console.error('Error creating comment:', error);
          alert(error);
        });
      setCommentInput('');
    } else {
      alert("You need to login first!");
    }
  };
  const handleRating = (rate) => {
    setRating(rate)
  }
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

  const handleRatingSubmit = async () => {
    if (authUser) {
      await axios
        .put(`http://localhost:3001/review/createRate/${id}`, {
          user: userInfo._id,
          rating: rating,
        })
        .then((response) => {
          alert("You have succesfully rated this place!")
        })
        .catch((error) => {
          console.error('Error rating:', error);
          alert(error);
        });
      setCommentInput('');
    } else {
      alert("You need to login first!");
    }
  }

 
  return (
    <div className="PageContainer UserPostPage">
      {reviewData && (
        <>
          <div className="UserPostContent">
            <div className="UserPostDetails">
              <div className="header"> 
                <h2 className="UserPostTitle">{reviewData.title}</h2>
                <div className="buttonContainer">
                  <Rating
                    size={20}
                    onClick={handleRating}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
                  />
                  <Button onClick={handleRatingSubmit}>Rate it</Button>
                </div>
              </div>
              
              <div className="UserPostRating">
                
                <p>{reviewData.rating.length} rating</p>
              </div>
              <p><IoLocationSharp/>{reviewData.location}</p>
              <p><IoTimeSharp />{reviewData.status}</p>
              <div className="UserPostCommentInput">
                <IoChatbubbleOutline size={20}/>
                <Input
                  placeholder="Comment"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <Button variant="primary" onClick={handleCommentSubmit}>
                  Enter
                </Button>
              </div>
              <h1>Recent Comments:</h1>
              <div className="CommentSection">
                {comments.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    user={comment.user}
                    comment={comment.content}
                  />
                ))}
              </div>
            </div>
          </div>
          <img src={reviewData.imgUrl} className="UserPostImage" alt="FeedbackImage" /> 
        </>
      )}
    </div>
  );
};

export default UserPostPage;
