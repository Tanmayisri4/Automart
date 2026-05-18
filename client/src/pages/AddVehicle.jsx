import { useState } from "react";

import API from "../services/api";


function AddVehicle() {

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "",
    vehicleType: "",
    condition: "",
    location: "",
    transmission: "",
    kilometers: "",
    image: "",
    description: "",
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
        "/vehicles",
        formData
      );

      alert(response.data.message);

    } catch (error) {

      alert(error.response.data.message);

    }

  };


  return (

    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded w-[500px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Vehicle
        </h1>


        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="text"
          name="brand"
          placeholder="Brand"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="text"
          name="model"
          placeholder="Model"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="number"
          name="year"
          placeholder="Year"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
        type="text"
        name="vehicleType"
        placeholder="Vehicle Type (Car/Bike/Truck)"
        className="w-full border p-3 mb-4 rounded"
        onChange={handleChange}
        />
        
        <input
        type="text"
        name="condition"
        placeholder="Condition (New/Used)"
        className="w-full border p-3 mb-4 rounded"
        onChange={handleChange}
        />
        
        <input
        type="text"
        name="location"
        placeholder="Location"
        className="w-full border p-3 mb-4 rounded"
        onChange={handleChange}
        />

        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="number"
          name="kilometers"
          placeholder="Kilometers"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

      <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <button
          className="bg-black text-white w-full p-3 rounded"
        >
          Add Vehicle
        </button>

      </form>

    </div>

  );

}

export default AddVehicle;