import Header from "../Components/common/Header";
import React, { useState } from "react";
import SignUpForm from "../Components/SignUpComponents/SignUPForm";
import LoginForm from "../Components/SignUpComponents/LoginForm";

const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignUpForm /> : <LoginForm />}
        {!flag ? (
          <p onClick={() => setFlag(!flag)} style={{ cursor: "pointer" }}>
            Already have an Account? Click here Login.
          </p>
        ) : (
          <p onClick={() => setFlag(!flag)} style={{ cursor: "pointer" }}>
            Don't have an account? Click here to Signup.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
