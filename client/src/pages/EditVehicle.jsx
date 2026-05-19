import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";


function EditVehicle() {

  const { id } = useParams();

  const navigate = useNavigate();

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


  useEffect(() => {

    fetchVehicle();

  }, []);


  const fetchVehicle = async () => {

    try {

      const response = await API.get(
        `/vehicles/${id}`
      );

      setFormData(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(
        `/vehicles/${id}`,
        formData
      );

      alert("Vehicle updated");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update vehicle."
      );

    }

  };


  return (

    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded w-[500px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Vehicle
        </h1>


        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="text"
          name="brand"
          value={formData.brand}
          placeholder="Brand"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="text"
          name="model"
          value={formData.model}
          placeholder="Model"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="number"
          name="year"
          value={formData.year}
          placeholder="Year"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Price"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="text"
          name="fuelType"
          value={formData.fuelType}
          placeholder="Fuel Type"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
        type="text"
        name="vehicleType"
        placeholder="Vehicle Type"
        value={formData.vehicleType}
        onChange={handleChange}
        className="w-full border p-3 mb-4 rounded"
        />

        <input
        type="text"
        name="condition"
        placeholder="Condition"
        value={formData.condition}
        onChange={handleChange}
        className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="text"
          name="transmission"
          value={formData.transmission}
          placeholder="Transmission"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <input
          type="number"
          name="kilometers"
          value={formData.kilometers}
          placeholder="Kilometers"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />


        <button
          className="bg-black text-white w-full p-3 rounded"
        >
          Update Vehicle
        </button>

      </form>

    </div>

  );

}

export default EditVehicle;