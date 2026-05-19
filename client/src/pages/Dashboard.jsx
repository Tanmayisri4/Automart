import { useEffect, useState } from "react";

import API from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {

  const [vehicles, setVehicles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.role === "seller") {
      fetchVehicles();
    }
  }, [user]);

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

      console.error(error);
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to fetch dashboard data."
      );

    }

  };

  if (!user) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        {user.role === "seller" ? "Seller Dashboard" : "Buyer Profile"}
      </h1>

      {user.role === "buyer" ? (
        <div className="space-y-4">
          <p className="text-lg">
            Welcome, {user.name}! You can browse vehicles, add favorites, and contact sellers.
          </p>
          <div className="bg-white shadow-lg p-6 rounded">
            <h2 className="text-2xl font-semibold mb-2">Your account</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded">
            <h2 className="text-2xl font-semibold mb-2">Buyer actions</h2>
            <p>Use the Favorites page to save vehicles you like.</p>
            <p>View vehicle details and contact sellers from the listing pages.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white shadow-lg p-4 rounded"
            >
              <h2 className="text-2xl font-bold mb-2">
                {vehicle.title}
              </h2>

              <p className="mb-2">₹{vehicle.price}</p>

              <Link
                to={`/edit-vehicle/${vehicle._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 inline-block"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteVehicle(vehicle._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}

export default Dashboard;