import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import axios from "axios";

function VehicleDetails() {

  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);

  const [rating, setRating] = useState("");

  const [comment, setComment] = useState("");


  useEffect(() => {

    fetchVehicle();

  }, []);


  const fetchVehicle = async () => {

    try {

      const response = await API.get(
        `/vehicles/${id}`
      );

      setVehicle(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  const submitReview = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post(

        `/vehicles/${id}/reviews`,

        {
          rating,
          comment,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      alert("Review added successfully");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Failed to add review");

    }

  };


  if (!vehicle) {

    return (
      <h1 className="text-center mt-20 text-2xl">
        Loading...
      </h1>
    );

  }

const handleBuyNow = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/payments/create-checkout-session",

      {
        vehicleId: vehicle._id,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = res.data.url;

  } catch (error) {
    console.log(error.response?.data);
    console.log(error.message);
  }
};

  return (

    <div className="p-10 max-w-4xl mx-auto">

      {/* IMAGE */}

      <img
        src={vehicle.image}
        alt={vehicle.title}
        className="
          w-full
          h-96
          object-cover
          rounded-xl
          mb-8
          shadow-lg
        "
      />


      {/* TITLE */}

      <h1 className="text-4xl font-bold mb-8">
        {vehicle.title}
      </h1>


      {/* DETAILS CARD */}

      <div className="bg-white shadow-lg rounded-xl p-8">


        <p className="mb-3">
          <strong>Brand:</strong>
          {" "}
          {vehicle.brand}
        </p>

        <p className="mb-3">
          <strong>Model:</strong>
          {" "}
          {vehicle.model}
        </p>

        <p className="mb-3">
          <strong>Year:</strong>
          {" "}
          {vehicle.year}
        </p>

        <p className="mb-3">
          <strong>Price:</strong>
          {" "}
          ₹{vehicle.price}
        </p>

        <p className="mb-3">
          <strong>Fuel Type:</strong>
          {" "}
          {vehicle.fuelType}
        </p>

        <p className="mb-3">
          <strong>Vehicle Type:</strong>
          {" "}
          {vehicle.vehicleType}
        </p>

        <p className="mb-3">
          <strong>Condition:</strong>
          {" "}
          {vehicle.condition}
        </p>

        <p className="mb-3">
          <strong>Location:</strong>
          {" "}
          {vehicle.location}
        </p>

        <p className="mb-3">
          <strong>Transmission:</strong>
          {" "}
          {vehicle.transmission}
        </p>

        <p className="mb-3">
          <strong>Kilometers:</strong>
          {" "}
          {vehicle.kilometers}
        </p>

        <p className="mb-6">
          <strong>Description:</strong>
          {" "}
          {vehicle.description}
        </p>


        {/* SELLER INFO */}

        <div className="border-t pt-6 mt-6">

          <h2 className="text-2xl font-bold mb-4">
            Seller Information
          </h2>

          <p className="mb-2">
            <strong>Name:</strong>
            {" "}
            {vehicle.seller?.name}
          </p>

          <p className="mb-4">
            <strong>Email:</strong>
            {" "}
            {vehicle.seller?.email}
          </p>


          <div className="flex flex-wrap gap-4">

            <a
              href={`mailto:${vehicle.seller?.email}`}
              className="
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-blue-700
              "
            >
              Contact Seller
            </a>


            <a
              href={`https://wa.me/${vehicle.seller?.phone}`}
              target="_blank"
              rel="noreferrer"
              className="
                bg-green-500
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-green-600
              "
            >
              WhatsApp Seller
            </a>

          <button
          onClick={handleBuyNow}
          className="
          bg-red-600
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-red-700
          transition
          duration-300
          font-semibold
          shadow-md
          "
        >
          Buy Now
        </button>

          </div>

        </div>


        {/* REVIEW FORM */}

        <div className="border-t pt-8 mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Add Review
          </h2>


          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
            className="
              border
              p-3
              rounded
              w-full
              mb-4
            "
          >

            <option value="">
              Select Rating
            </option>

            <option value="1">
              1 Star
            </option>

            <option value="2">
              2 Stars
            </option>

            <option value="3">
              3 Stars
            </option>

            <option value="4">
              4 Stars
            </option>

            <option value="5">
              5 Stars
            </option>

          </select>


          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="
              border
              p-3
              rounded
              w-full
              mb-4
            "
          />


          <button
            onClick={submitReview}
            className="
              bg-yellow-500
              text-white
              px-6
              py-3
              rounded-lg
              hover:bg-yellow-600
            "
          >
            Submit Review
          </button>

        </div>


        {/* REVIEWS */}

        <div className="border-t pt-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Customer Reviews
          </h2>


          {

            vehicle.reviews?.length === 0

            ? (

              <p>No reviews yet.</p>

            )

            : (

              vehicle.reviews.map((review, index) => (

                <div
                  key={index}
                  className="
                    border
                    p-4
                    rounded-lg
                    mb-4
                  "
                >

                  <h3 className="font-bold text-lg">
                    {review.name}
                  </h3>

                  <p className="text-yellow-500 mb-2">
                    ⭐ {review.rating} / 5
                  </p>

                  <p>
                    {review.comment}
                  </p>

                </div>

              ))

            )

          }

        </div>

      </div>

    </div>

  );

}

export default VehicleDetails;