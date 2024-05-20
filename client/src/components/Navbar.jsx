import React from "react";
// Router
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { LOGOUT } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const logout = () => {
    dispatch(LOGOUT());
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  return (
    <div className="Navbar">
      <div className="navbar-left">
        <NavLink to={user ? "/mynote" : "/"}>
          <h1>My Note</h1>
        </NavLink>
      </div>
      <div className="navbar-right">
        {user ? (
          <ul className="content">
            <NavLink to="/createnote" className="selected">
              <li>New Note</li>
            </NavLink>
            <NavLink to="/allnote"  className="selected">
              <li>All Note</li>
            </NavLink>
            <button onClick={logout}>Logout</button>
          </ul>
        ) : (
          <>
            <div className="content">
              <Link to="/">
                <FaUser className="icons" /> Login
              </Link>
              <NavLink to="/register">
                <FaUserPlus className="icons" /> Register
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
