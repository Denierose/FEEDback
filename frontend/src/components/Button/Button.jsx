import "./Button.css";

const Button = ({type, children, onClick, variant, size}) => {
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`btn ${variant} ${size}`}>
        {children}
    </button>
  )
}

export default Button