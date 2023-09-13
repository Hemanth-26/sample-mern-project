import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // let inputs = event.target.length - 1;
    // console.log(event.target.length - 1);
    // let obj = Array(inputs).reduce((acc, curr) => {
    //   acc[event.target[curr].name] = event.target[curr].value;
    //   console.log(acc, curr);
    //   return acc;
    // }, {});
    // console.log(obj);
    let data = {
      [event.target[0].name]: event.target[0].value,
      [event.target[1].name]: event.target[1].value,
    };
    console.log(data);

    axios
      .post("http://localhost:4000/login", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("user_id", res?.data?.user_id);
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form action="" onSubmit={onSubmitHandler}>
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
            name="password"
            id="password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
