import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    customer_id: "",
    customer_name: "",
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.password !== value.password1) {
      alert("Password not match");
    } else {
      axios.post(process.env.REACT_APP_API + "/register", value)
        .then((res) => {
          //console.log(res.data);
          alert("Register Success");
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  return (
    <div className="container-register">
      <h3 className="big-title">Register</h3>

      <div className="form-register">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h3>Customer Id</h3>
            <input type="text" name="customer_id" onChange={handleChange} />
          </div>

          <div className="form-group">
            <h3>Name</h3>
            <input type="text" name="customer_name" onChange={handleChange} />
          </div>

          <div className="form-group">
            <h3>Password</h3>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className="form-group">
            <h3>Confirm Password</h3>
            <input
              className="form-control"
              type="password"
              name="password1"
              onChange={handleChange}
            />
          </div>
          <div className="btn-container ">
            <button className="btn-custom ">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
