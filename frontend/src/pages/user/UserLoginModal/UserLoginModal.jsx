
import { IoMailOutline, IoLockClosedOutline, IoCloseCircleOutline } from "react-icons/io5";
import { Formik, Form, Field } from 'formik';
import { LoginInitial, LoginSchema } from "./UserLoginValidation";
import { signInWithEmailAndPassword }from "firebase/auth";
import Button from "../../../components/Button/Button";
import "./UserLoginModal.css";
import Modal from 'react-awesome-modal';
import { auth, signInWithGoogle } from "../../../config/firebase";


const UserLoginModal = ({ visible, onClose }) => {
  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onClose(false);
      alert("You have successfully logged in!");
    } catch (error) {
      alert("An error occurred during login. Please check your credentials.");
    }
  };

  const closeModal = () => {
    onClose(false);
  };

  return (
    <Modal visible={visible} width="500" effect="fadeInUp" onClickAway={closeModal} >
      <Formik initialValues={LoginInitial} validationSchema={LoginSchema} onSubmit={handleLogin}>
        {({ errors, touched }) => (
          <Form>
            <div className="UserForm">
              <Button onClick={closeModal}><IoCloseCircleOutline size={30} className="CloseModal"/></Button>
              <h1>FEEDback</h1>
              <p>Login to continue</p>
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
                {errors.email && touched.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="UserInputLabel">
                <label>Password</label>
                <div className="UserInput">
                  <IoLockClosedOutline />
                  <Field
                    type="password" 
                    name="password"
                    placeholder="Password must be at least 8 characters"
                  />
                </div>
                {errors.password && touched.password && <div className="error">{errors.password}</div>}
              </div>
              <Button type="submit" variant="primary user-form-btn" size="full lg">
                Sign in
              </Button>
              <Button size="full lg" onClick={signInWithGoogle}>
                Sign in with Google
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserLoginModal;
