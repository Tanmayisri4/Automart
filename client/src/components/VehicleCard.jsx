import { Link } from "react-router-dom";
import API from "../services/api";

function VehicleCard({ vehicle }) {
  const addFavorite = async () => {

  try {

    const token = localStorage.getItem("token");

    await API.post(

      `/auth/favorites/${vehicle._id}`,

      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    alert("Added to favorites ❤️");

  } catch (error) {

    console.error(error);
    alert(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to add favorite"
    );

  }

};
  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
        hover:scale-105
        transition
        duration-300
      "
    >

      <img
        src={vehicle.image}
        alt={vehicle.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold mb-2">
          {vehicle.title}
        </h2>

        <p className="text-gray-600 mb-2">
          {vehicle.brand} • {vehicle.model}
        </p>

        <p className="text-xl font-semibold text-green-600 mb-2">
          ₹{vehicle.price}
        </p>

        <p className="text-gray-500 mb-4">
          {vehicle.fuelType} • {vehicle.transmission}
        </p>

        <p className="text-gray-500 mb-2">
          {vehicle.vehicleType} • {vehicle.condition}
          </p>
          
          <p className="text-gray-500 mb-4">
            📍 {vehicle.location}
          </p>
          
        <Link
          to={`/vehicle/${vehicle._id}`}
          className="
            inline-block
            bg-black
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-gray-800
          "
        >
          View Details
        </Link>
        <button
  onClick={addFavorite}
  className="
    bg-red-500
    text-white
    px-4
    py-2
    rounded-lg
    hover:bg-red-600
    mt-4
    w-full
  "
>
  Add to Favorites
</button>

      </div>

    </div>

  );

}

export default VehicleCard;