/** @format */

import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMsg("");
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    // Validate the form data
    // checkValidData()
    console.log(email, password);
    // it is printing the object. in that object current key has value which
    //  stores the actual value of the input
    console.log(email.current.value); //it will print the actual value
    const message = checkValidData(email.current.value, password.current.value);
    console.log(message);
    setErrorMsg(message);

    if (message === null) {
      // signin/singup
      if (!isSignInForm) {
        // signup logic
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user objec", user);

            updateProfile(user, {
              displayName: name.current.value,
              photoURL: USER_AVATAR, //here {USER_AVATAR} will give error as it was not a JSX
            })
              .then(() => {
                // Profile updated!
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
              })
              .catch((error) => {
                // An error occurred
                const errorMessage = error.message;
                console.log("in error", errorMessage);
                setErrorMsg(errorMessage);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("in error", errorCode, errorMessage);
            setErrorMsg(errorMessage);
          });
      } else {
        // signi in logic

        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user login", user);
            // navigate("/browse"); navigate will happen from header componetn
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("in error", errorMessage);
            setErrorMsg(errorMessage);
          });
      }
    }
  };

  return (
    <div>
      <Header />
      <div>
        <img className="absolute" alt="bg img" src={BG_URL} />
      </div>
      <form className="absolute p-12 bg-black w-4/12 my-32 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg">{errorMsg}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Signup Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
