import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    let data = {
      [event.target[0].name]: event.target[0].value,
      [event.target[1].name]: event.target[1].value,
      [event.target[2].name]: event.target[2].value,
      [event.target[3].name]: event.target[3].value,
      [event.target[4].name]: event.target[4].value,
    };
    console.log(data);
    if (event.target[5].value === event.target[4].value) {
      axios
        .post("http://localhost:4000/register", data)
        .then((res) => {
          console.log(res);
          navigate("/login")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="input-con">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            id="firstName"
            name="firstName"
          />
        </div>
        <div className="input-con">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            id="lastName"
            name="lastName"
          />
        </div>
        <div className="input-con">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            placeholder="Enter your user name"
            id="userName"
            name="userName"
          />
        </div>
        <div className="input-con">
          <label htmlFor="email">email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
          />
        </div>
        <div className="input-con">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
          />
        </div>
        <div className="input-con">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
