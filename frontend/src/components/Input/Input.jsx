import "./Input.css"

const Input = ({type, placeholder, onChange, value}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default Input