import { useEffect, useState } from "react";

import API from "../services/api";

import VehicleCard from "../components/VehicleCard";


function Home() {

  const [vehicles, setVehicles] = useState([]);

  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [search, setSearch] = useState("");

  const [fuelFilter, setFuelFilter] = useState("");

  const [priceFilter, setPriceFilter] = useState("");

  const [sortOption, setSortOption] = useState("");

  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");

  const [locationFilter, setLocationFilter] = useState("");

  const [yearFilter, setYearFilter] = useState("");


  useEffect(() => {

    fetchVehicles();

  }, []);


  const fetchVehicles = async () => {

    try {

      const response = await API.get("/vehicles");

      setVehicles(response.data);

      setFilteredVehicles(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  const applyFilters = (
    searchValue,
    fuelValue,
    priceValue,
    sortValue,
    vehicleTypeValue,
    locationValue,
    yearValue
  ) => {

    let filtered = [...vehicles];


    // SEARCH

    if (searchValue) {

      filtered = filtered.filter((vehicle) =>

        vehicle.title
          .toLowerCase()
          .includes(searchValue.toLowerCase())

        ||

        vehicle.brand
          .toLowerCase()
          .includes(searchValue.toLowerCase())

      );

    }


    // FUEL

    if (fuelValue) {

      filtered = filtered.filter(

        (vehicle) =>

          vehicle.fuelType
            ?.toLowerCase() ===
          fuelValue.toLowerCase()

      );

    }


    // PRICE

    if (priceValue) {

      filtered = filtered.filter(

        (vehicle) =>

          vehicle.price <= Number(priceValue)

      );

    }


    // VEHICLE TYPE

    if (vehicleTypeValue) {

      filtered = filtered.filter(

        (vehicle) =>

          vehicle.vehicleType
            ?.toLowerCase() ===
          vehicleTypeValue.toLowerCase()

      );

    }


    // LOCATION

    if (locationValue) {

      filtered = filtered.filter(

        (vehicle) =>

          vehicle.location
            ?.toLowerCase()
            .includes(
              locationValue.toLowerCase()
            )

      );

    }


    // YEAR

    if (yearValue) {

      filtered = filtered.filter(

        (vehicle) =>

          vehicle.year >= Number(yearValue)

      );

    }


    // SORTING

    if (sortValue === "lowToHigh") {

      filtered.sort(
        (a, b) => a.price - b.price
      );

    }

    else if (sortValue === "highToLow") {

      filtered.sort(
        (a, b) => b.price - a.price
      );

    }

    else if (sortValue === "newest") {

      filtered.sort(

        (a, b) =>

          new Date(b.createdAt) -
          new Date(a.createdAt)

      );

    }


    setFilteredVehicles(filtered);

  };


  // HANDLERS

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    applyFilters(
      value,
      fuelFilter,
      priceFilter,
      sortOption,
      vehicleTypeFilter,
      locationFilter,
      yearFilter
    );

  };


  const handleFuelFilter = (e) => {

    const value = e.target.value;

    setFuelFilter(value);

    applyFilters(
      search,
      value,
      priceFilter,
      sortOption,
      vehicleTypeFilter,
      locationFilter,
      yearFilter
    );

  };


  const handlePriceFilter = (e) => {

    const value = e.target.value;

    setPriceFilter(value);

    applyFilters(
      search,
      fuelFilter,
      value,
      sortOption,
      vehicleTypeFilter,
      locationFilter,
      yearFilter
    );

  };


  const handleSort = (e) => {

    const value = e.target.value;

    setSortOption(value);

    applyFilters(
      search,
      fuelFilter,
      priceFilter,
      value,
      vehicleTypeFilter,
      locationFilter,
      yearFilter
    );

  };


  const handleVehicleTypeFilter = (e) => {

    const value = e.target.value;

    setVehicleTypeFilter(value);

    applyFilters(
      search,
      fuelFilter,
      priceFilter,
      sortOption,
      value,
      locationFilter,
      yearFilter
    );

  };


  const handleLocationFilter = (e) => {

    const value = e.target.value;

    setLocationFilter(value);

    applyFilters(
      search,
      fuelFilter,
      priceFilter,
      sortOption,
      vehicleTypeFilter,
      value,
      yearFilter
    );

  };


  const handleYearFilter = (e) => {

    const value = e.target.value;

    setYearFilter(value);

    applyFilters(
      search,
      fuelFilter,
      priceFilter,
      sortOption,
      vehicleTypeFilter,
      locationFilter,
      value
    );

  };


  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Available Vehicles
      </h1>


      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search by title or brand..."
        value={search}
        onChange={handleSearch}
        className="border p-3 rounded w-full mb-8"
      />


      {/* FILTERS */}

      <div className="flex flex-wrap gap-4 mb-8">


        <select
          value={fuelFilter}
          onChange={handleFuelFilter}
          className="border p-3 rounded"
        >

          <option value="">
            All Fuel Types
          </option>

          <option value="Petrol">
            Petrol
          </option>

          <option value="Diesel">
            Diesel
          </option>

          <option value="Electric">
            Electric
          </option>

          <option value="Hybrid">
            Hybrid
          </option>

        </select>


        <select
          value={priceFilter}
          onChange={handlePriceFilter}
          className="border p-3 rounded"
        >

          <option value="">
            Any Price
          </option>

          <option value="500000">
            Below ₹5 Lakhs
          </option>

          <option value="1000000">
            Below ₹10 Lakhs
          </option>

          <option value="2000000">
            Below ₹20 Lakhs
          </option>

          <option value="4000000">
            Below ₹40 Lakhs
          </option>

        </select>


        <select
          value={vehicleTypeFilter}
          onChange={handleVehicleTypeFilter}
          className="border p-3 rounded"
        >

          <option value="">
            All Types
          </option>

          <option value="Car">
            Car
          </option>

          <option value="Bike">
            Bike
          </option>

          <option value="Truck">
            Truck
          </option>

        </select>


        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={handleLocationFilter}
          className="border p-3 rounded"
        />


        <select
          value={yearFilter}
          onChange={handleYearFilter}
          className="border p-3 rounded"
        >

          <option value="">
            Any Year
          </option>

          <option value="2015">
            2015+
          </option>

          <option value="2018">
            2018+
          </option>

          <option value="2020">
            2020+
          </option>

        </select>


        <select
          value={sortOption}
          onChange={handleSort}
          className="border p-3 rounded"
        >

          <option value="">
            Sort By
          </option>

          <option value="lowToHigh">
            Price: Low to High
          </option>

          <option value="highToLow">
            Price: High to Low
          </option>

          <option value="newest">
            Newest Listings
          </option>

        </select>

      </div>


      {/* VEHICLES */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">

        {

          filteredVehicles.map((vehicle) => (

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

export default Home;