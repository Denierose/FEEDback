import "./CommentCard.css"

const CommentCard = ({user, comment}) => {
  return (
    <div className="CommentCard">
        <h3>{user}</h3>
        {comment}
    </div>
  )
}

export default CommentCard