import { useState } from "react";

import API from "../services/api";


function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
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

      console.error(error);
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to register. Check backend and network."
      );

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
          value={formData.name}
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
          value={formData.password}
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <label className="block mb-2 font-medium">
          Register as
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

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