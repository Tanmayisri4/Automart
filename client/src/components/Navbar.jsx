import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <nav
      className="
        bg-black
        text-white
        px-8
        py-4
        flex
        justify-between
        items-center
        shadow-lg
      "
    >

      <Link
        to="/"
        className="text-3xl font-bold"
      >
        AutoMart🚗
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/">
          Home
        </Link>

        {!token && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

        {token && (
          <>

            <Link to="/add-vehicle">
              Add Vehicle
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            {user?.role === "admin" && (
              <Link to="/admin">
                Admin
              </Link>
            )}
            
            <Link to="/favorites">
            Favorites
            </Link>

            <Link to="/notifications">
            Notifications
            </Link>

            <Link to="/messages">
            Messages
            </Link>

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                px-4
                py-2
                rounded-lg
                hover:bg-red-600
              "
            >
              Logout
            </button>

          </>
        )}

      </div>

    </nav>

  );

}

export default Navbar;