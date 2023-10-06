import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_DYxWXdCnYQUpy1o85nhEwHacevXWnLo",
  authDomain: "complete-galaxy-399201.firebaseapp.com",
  projectId: "complete-galaxy-399201",
  storageBucket: "complete-galaxy-399201.appspot.com",
  messagingSenderId: "9729221862",
  appId: "1:9729221862:web:df612dac075571db594727",
  measurementId: "G-TZXS8SM7ZK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider).then((data) => {
        const name = data.user.displayName;
        const email = data.user.email;
        const profilePic = data.user.photoURL;
  
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
  
        alert("You have successfully logged in!");
        window.location.href = "/";
      }).catch((error) => {
        console.log(error)
      })
   } catch (error) {
        console.log(error)
   }
  }
  

export { app, auth, signInWithGoogle }