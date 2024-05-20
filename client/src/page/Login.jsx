import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    customer_id: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(process.env.REACT_APP_API + "/login", value)
      .then((res) => {
        alert("เข้าสู่ระบบสำเร็จ");
        const userData = {
            token: res.data.token,
            CustomerId: res.data.payload.customer.CustomerId,
            CustomerName: res.data.payload.customer.CustomerName, 
        };
        //console.log(userData);
        dispatch(LOGIN(userData));
        navigate("/mynote");
      })
      .catch((error) => {
        console.error("Error Login", error);
      });
  };

  return (
    <div className="container-login">
      <h3 className="big-title">Login</h3>
      <div className="form-login">
        <form onSubmit={handleSubmit}>
          <div className="form-group ">
            <h3>Customer Id</h3>
            <input type="text" name="customer_id" onChange={handleChange} />
          </div>
          <div className="form-group ">
            <h3>Password</h3>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className="btn-container ">
            <button className="btn-custom ">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
