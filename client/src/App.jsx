import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { LOGIN } from './redux/authSlice'; // Adjust the path as necessary
import Login from './page/Login';
import MyNote from './page/MyNote';
import Register from './page/Register';
import Createnote from './page/Createnote';
import AllNote from './page/Allnote';
import SinglePage from './page/SinglePage';
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(LOGIN(userData));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mynote" element={<MyNote />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createnote" element={<Createnote />} />
        <Route path="/allnote" element={<AllNote />} />
        <Route path="/note/:id" element={<SinglePage />} />
      </Routes>
    </>
  );
}

export default App;
