import "./App.css";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Offering from "./components/Offering";
import Blog from "./components/Blog";
import About from "./components/About";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import { Toaster } from "./components/ui/sonner.jsx";
import EditProfile from "./components/EditProfile";
import BlogInside from "./components/BlogInside";
import Browse from "./components/Browse";
import ComingSoon from "./components/ComingSoon";
import ForgetPasswordEmail from "./components/ForgetPassword/ForgetPasswordEmail";
import RecoverPassword from "./components/ForgetPassword/RecoverPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./components/shared/PrivacyPolicy";
import TermsAndConditions from "./components/shared/TermsAndConditions";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/coming-soon", element: <ComingSoon /> },
    { path: "/offering", element: <Offering /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blogInside/:id", element: <BlogInside /> },
    { path: "/about", element: <About /> },
    { path: "/SignUp", element: <SignUp /> },
    { path: "/login", element: <Login /> },
    { path: "/editProfile", element: <ProtectedRoute><EditProfile /></ProtectedRoute> },
    { path: "/browse", element: <Browse /> },
    { path: "/forget-password", element: <ForgetPasswordEmail /> },
    { path: "/recover-password/:id", element: <RecoverPassword /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms-condition", element: <TermsAndConditions /> }
  ]);

  return (
    <HelmetProvider>
      <Toaster richColors />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
