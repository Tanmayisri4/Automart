import { useEffect, useState } from "react";

import API from "../services/api";


function AdminDashboard() {

  const [users, setUsers] = useState([]);

  const [vehicles, setVehicles] = useState([]);


  useEffect(() => {

    fetchUsers();

    fetchVehicles();

  }, []);


  const fetchUsers = async () => {

    try {

      const response = await API.get(
        "/admin/users"
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  const fetchVehicles = async () => {

    try {

      const response = await API.get(
        "/admin/vehicles"
      );

      setVehicles(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  const deleteVehicle = async (id) => {

    try {

      await API.delete(
        `/admin/vehicles/${id}`
      );

      alert("Vehicle deleted");

      fetchVehicles();

    } catch (error) {

      alert(error.response.data.message);

    }

  };


  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>


      {/* USERS */}

      <div className="mb-12">

        <h2 className="text-2xl font-bold mb-4">
          All Users
        </h2>

        <div className="bg-white shadow rounded p-4">

          {users.map((user) => (

            <div
              key={user._id}
              className="border-b py-3"
            >

              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* VEHICLES */}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          All Vehicles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {vehicles.map((vehicle) => (

            <div
              key={vehicle._id}
              className="bg-white shadow-lg rounded p-4"
            >

              <h3 className="text-xl font-bold mb-2">
                {vehicle.title}
              </h3>

              <p>
                ₹{vehicle.price}
              </p>

              <p className="mb-4">
                Seller:
                {" "}
                {vehicle.seller?.name}
              </p>

              <button
                onClick={() =>
                  deleteVehicle(vehicle._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete Vehicle
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;