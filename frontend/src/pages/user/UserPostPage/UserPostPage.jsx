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
  const [selectedComment, setSelectedComment] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

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
  }, [id, comments, authUser, userInfo, reviewData]);

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
  const handleCommentUpdate = (comment) => {
    setSelectedComment(comment);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedComment(null);
    setUpdateModalOpen(false);
  };
  const updateComment = async () => {
    const fullname =  `${userInfo.firstName} ${userInfo.lastName}`;
    if (authUser && selectedComment) {
      try {
        const response = await axios.put(`http://localhost:3001/review/updateComment/${id}`, {
          user: fullname,
          content: selectedComment.content,
        });
        if (response.data) {
          setUpdateModalOpen(false);
        }
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }
  };
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
                <div key={comment._id}>
                  <CommentCard
                    user={comment.user}
                    comment={comment.content}
                  />
                 {comment.user === `${userInfo.firstName} ${userInfo.lastName}` ?
                  <Button onClick={() => handleCommentUpdate(comment)}>Update Comment</Button> :
                  null}
                </div>
              ))}
              </div>
            </div>
          </div>
          <img src={reviewData.imgUrl} className="UserPostImage" alt="FeedbackImage" /> 
        </>
      )}
       {isUpdateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Comment</h2>
            <input
              placeholder="Update your comment"
              value={selectedComment.content}
              onChange={(e) => setSelectedComment({ ...selectedComment, content: e.target.value })}
            />
            <Button variant="primary" onClick={updateComment}>Update</Button>
            <Button variant="secondary" onClick={closeUpdateModal}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPostPage;
