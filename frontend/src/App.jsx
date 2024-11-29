import { useEffect } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "./store/slices/socketSlice";
import { setOnlineUsers } from "./store/slices/chatSlice";
import {
  setLikeNotifications,
  setMessageNotifications,
} from "./store/slices/rtnSlice";
import ProtectedRoute from "./components/ProtectedRoute";
// import AllFollowingData from "./components/AllFollowingData";
// import { Toast } from "react-toastify/dist/components";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />,
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/account/edit",

        element: (
          <ProtectedRoute>
            <EditProfile />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoute>
            <ChatPage />,
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/profile/Following",
      //   element: (
      //     <ProtectedRoute>
      //       <AllFollowingData />
      //     </ProtectedRoute>
      //   ),
      // },
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
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socketio);
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;
  useEffect(() => {
    if (user) {
      const socketio = io(`${BASE_URL}`, {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      console.log("socketio", socketio);
      dispatch(setSocket(socketio));

      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(setLikeNotifications(notification));
        dispatch(setMessageNotifications(notification));
      });
      // socketio.on("message", (message) => {
      //   dispatch(setMessageNotifications(message));
      // });
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);
  return (
    <>
      {/* <Signup />
      <ToastContainer position="top-right" theme="dark" /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
