import { useEffect, useState } from "react";

import API from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {

  const [vehicles, setVehicles] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  useEffect(() => {

    fetchVehicles();

  }, []);


  const fetchVehicles = async () => {

    try {

      const response = await API.get("/vehicles");

      // Filter seller vehicles
      const sellerVehicles = response.data.filter(
        (vehicle) =>
          vehicle.seller?._id === user._id
      );

      setVehicles(sellerVehicles);

    } catch (error) {

      console.log(error);

    }

  };


  const deleteVehicle = async (id) => {

    try {

      await API.delete(`/vehicles/${id}`);

      alert("Vehicle deleted");

      fetchVehicles();

    } catch (error) {

      alert(error.response.data.message);

    }

  };


  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Seller Dashboard
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {vehicles.map((vehicle) => (

          <div
            key={vehicle._id}
            className="bg-white shadow-lg p-4 rounded"
          >

            <h2 className="text-2xl font-bold mb-2">
              {vehicle.title}
            </h2>

            <p className="mb-2">
              ₹{vehicle.price}
            </p>

<Link
  to={`/edit-vehicle/${vehicle._id}`}
  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 inline-block"
>
  Edit
</Link>
            <button
              onClick={() =>
                deleteVehicle(vehicle._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Dashboard;