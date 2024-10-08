import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./pages/Signup";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
// import { Home } from "lucide-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChatPage from "./pages/ChatPage";
// import { Toast } from "react-toastify/dist/components";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/account/edit",
        element: <EditProfile />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
function App() {
  return (
    <>
      {/* <Signup />
      <ToastContainer position="top-right" theme="dark" /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
