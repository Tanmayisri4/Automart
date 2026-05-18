import { useEffect, useState } from "react";

import API from "../services/api";

import VehicleCard from "../components/VehicleCard";


function Favorites() {

  const [favorites, setFavorites] = useState([]);


  useEffect(() => {

    fetchFavorites();

  }, []);


  const fetchFavorites = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(

        "/auth/favorites",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setFavorites(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        My Favorites 
      </h1>


      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">

        {

          favorites.map((vehicle) => (

            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
            />

          ))

        }

      </div>

    </div>

  );

}

export default Favorites;