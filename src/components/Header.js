/** @format */

import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  console.log("user in header", user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        // action of dispatch will take from Body component
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    // whenever user signIN or signup or signout this function will get called
    // this is given to us by firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // as soon as user signin we will redirect to browse page
        navigate("/browse"); //also this will not allow logged in user to go to / route
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/"); //this will also not allow any user to go to browsee if it in not logged in
      }
    });

    // Unsubscribe when component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="netflix logo" />
      {user && (
        <div className="flex p-2 gap-2">
          {/* <img className='w-12 h-12 ' src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"/> */}
          <img className="w-12 h-12 " src={user.photoURL} />

          <button className="font-bold text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
