import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

      alert("Login successful");

      navigate("/");

    } catch (error) {

      alert(error.response.data.message);

    }

  };


  return (

    <div className="flex justify-center items-center mt-20">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>


        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <button
          className="bg-black text-white w-full p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;