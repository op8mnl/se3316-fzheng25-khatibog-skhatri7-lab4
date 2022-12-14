import React, { useState } from "react";

import { sendEmailVerification } from "firebase/auth";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "./firebase.js";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      sendEmailVerification(user);
      alert("Email verification sent, please click the verification link");
      resetFields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("This email is already in use");
      } else {
        console.log("An error occurred while creating the user", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div class="sign-up-container">
      <h2>Not Signed Up Yet?</h2>
      <span>Sign Up with your Email and Password</span>
      <form
        style={{ justifyContent: "center", alignItems: "center" }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            height: "10%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Full Name"
            class="form-control"
            type="text"
            label="Name"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />
        </div>

        <div
          style={{
            height: "10%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Email"
            class="form-control"
            type="text"
            label="Email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
        </div>

        <div
          style={{
            height: "10%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Password"
            class="form-control"
            type="password"
            label="Password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
        </div>

        <div
          style={{
            height: "10%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Confirm Password"
            class="form-control"
            type="password"
            label="Confirm Password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
        </div>
        <button class="button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
