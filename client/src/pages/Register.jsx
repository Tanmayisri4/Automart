import { useState } from "react";

import API from "../services/api";


function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
        "/auth/register",
        formData
      );

      alert(response.data.message);

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
          Register
        </h1>


        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
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
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;