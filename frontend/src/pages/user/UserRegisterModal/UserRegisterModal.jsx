import "./UserRegisterModal.css";
import Modal from 'react-awesome-modal';
import Button from "../../../components/Button/Button";
import axios from "axios"
import { IoMailOutline, IoLockClosedOutline, IoCloseCircleOutline } from "react-icons/io5";
import { Formik, Form, Field } from 'formik';
import { RegisterInitialValue, RegisterSchema } from "./UserRegisterValidation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";

const UserRegisterModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    const { firstName, lastName, email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await axios.post("http://localhost:3001/user/register", {
        firstName: firstName,
        lastName: lastName,
        email: email
      })
      onClose(false);
      alert("You have successfully created an account!.");
    } catch (error) {
      alert("An error occurred during registration. Please try again later.");
    }
  };


  const closeModal = () => {
    onClose(false);
  };

  return (
    <Modal visible={visible} width="500"  effect="fadeInUp" onClickAway={closeModal} >
      <Formik initialValues={RegisterInitialValue} onSubmit={handleSignUp} validationSchema={RegisterSchema}>
        {({errors, touched}) => (
          <Form className="UserForm">
            <Button onClick={closeModal}><IoCloseCircleOutline size={30} className="CloseModal"/></Button>
            <h1>Create an Account</h1>
            <div className="UserInputNameForm">
              <div className="UserInputLabel">
                <label>First Name</label>
                <div className="UserInput">
                  <Field 
                    type="text"
                    name="firstName"
                    placeholder="John" 
                  />
                </div>
                {errors.firstName && touched.firstName ? (
                <div className="error">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="UserInputLabel">
                <label>Last Name</label>
                <div className="UserInput">
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Doe" 
                  />
                </div>
                {errors.lastName && touched.lastName ? (
                <div className="error">{errors.lastName}</div>
                ) : null}
              </div>
            </div>
            <div className="UserInputLabel">
              <label>Email</label>
              <div className="UserInput">
                <IoMailOutline />
                <Field
                  type="email"
                  name="email"
                  placeholder="johndoe123@gmail.com" 
                />
              </div>
              {errors.email && touched.email ? (
                <div className="error">{errors.email}</div>
                ) : null}
            </div>
            <div className="UserInputLabel">
              <label>Password</label>
              <div className="UserInput">
                <IoLockClosedOutline />
                <Field
                  type="password" 
                  name="password"
                  placeholder="Password mus be atleast 8 characters"
                />
              </div>
              {errors.password && touched.password ? (
                <div className="error">{errors.password}</div>
                ) : null}
            </div>
            <div className="UserInputLabel">
              <label>Confirm Password</label>
              <div className="UserInput">
                <IoLockClosedOutline />
                <Field 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Password must match"
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div >{errors.confirmPassword}</div>
                ) : null}
            </div>

            <Button type="submit" variant="primary user-form-btn" size="full lg">Sign up</Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserRegisterModal;