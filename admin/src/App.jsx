import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are applied
import Register from "./components/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin/login",
      element: <Login />,
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
    },
    {
      path : "/admin/register",
      element : <Register/>
    }
  ]);
  return (
    <>
      <ToastContainer
        position="top-right" // Optional: Set toast position
        autoClose={3000} // Optional: Auto-close duration in ms
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
