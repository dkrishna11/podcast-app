import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { auth, db } from "../../../fireBase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlices";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [user, setUsers] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  async function handleLogin() {
    console.log("Login");
    if (user.password.length >= 6 && user.email !== "") {
      setLoading(true);
      try {
        //creating user Account:
        const userCredential = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        const userDetails = userCredential.user;
        console.log("user", userDetails);

        const userDoc = await getDoc(doc(db, "users", userDetails.uid));
        const usersData = userDoc.data();
        console.log(usersData);

        //save data in redux
        dispatch(
          setUser({
            name: usersData.name,
            email: userDetails.email,
            uid: userDetails.uid,
            profilePic: usersData.profilePic,
          })
        );
        setLoading(false);
        toast.success("Login Success");
        navigate("./profile");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (user.password === "" || user.email === "") {
        toast.error("Please fill all the fields ");
      } else if (user.password.length < 6) {
        toast.error("Passwod must be aleast 6 digits ");
      }
      setLoading(false);
    }
  }
  const handleInputChange = (fieldName, value) => {
    setUsers((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  return (
    <>
      <InputComponent
        state={user.email}
        setState={(value) => handleInputChange("email", value)}
        placeholder="Email"
        type="email"
        required={true}
      />

      <InputComponent
        state={user.password}
        setState={(value) => handleInputChange("password", value)}
        placeholder="Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
    </>
  );
};

export default LoginForm;
