import {

  BrowserRouter,

  Routes,

  Route,

} from "react-router-dom";


import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";


import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import AddVehicle from "./pages/AddVehicle";

import Dashboard from "./pages/Dashboard";

import VehicleDetails from "./pages/VehicleDetails";

import EditVehicle from "./pages/EditVehicle";

import AdminDashboard from "./pages/AdminDashboard";

import Favorites from "./pages/Favorites";

import Notifications from "./pages/Notifications";

import Messages from "./pages/Messages";

import PaymentSuccess from "./pages/PaymentSuccess";

import PaymentCancel from "./pages/PaymentCancel";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/vehicle/:id"
          element={<VehicleDetails />}
        />

        <Route
          path="/add-vehicle"
          element={
            <ProtectedRoute role="seller">
              <AddVehicle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-vehicle/:id"
          element={
            <ProtectedRoute>

              <EditVehicle />

            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>

              <Favorites />

            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>

              <Notifications />

            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
            <Messages />
            </ProtectedRoute>
          }
        />
        <Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>

<Route
  path="/payment-cancel"
  element={<PaymentCancel />}
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;