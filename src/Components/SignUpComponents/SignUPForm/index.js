import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { auth, db } from "../../../fireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlices";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [user, setUsers] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  async function handleSignup() {
    console.log("signup");
    setLoading(true);
    if (
      user.fullName !== "" &&
      user.email !== "" &&
      user.password === user.confirmPassword &&
      user.password.length >= 6
    ) {
      try {
        //creating user Account:
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        const userDetails = userCredential.user;
        console.log("user", userDetails);

        await setDoc(doc(db, "users", userDetails.uid), {
          name: user.fullName,
          email: userDetails.email,
          uid: userDetails.uid,
        });

        //save data in redux
        dispatch(
          setUser({
            name: user.fullName,
            email: userDetails.email,
            uid: userDetails.uid,
          })
        );
        setLoading(false);

        toast.success("Signup Success");

        navigate("./profile");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (user.fullName === "" || user.email === "") {
        toast.error("Please fill all the fields ");
      } else if (user.password.length < 6) {
        toast.error("Passwod must be aleast 6 digits ");
      } else if (user.password !== user.confirmPassword) {
        toast.error("Password are not matching!");
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
        state={user.fullName}
        setState={(value) => handleInputChange("fullName", value)}
        placeholder="Full Name"
        type="text"
        required={true}
      />

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

      <InputComponent
        state={user.confirmPassword}
        setState={(value) => handleInputChange("confirmPassword", value)}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "loading..." : "SignUp"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
};

export default SignUpForm;
