import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Error404 from "./pages/Error404"
import Cart from "./pages/Cart"
import LayoutWithNavbar from "./layouts/LayoutWithNavbar"
import LayoutWithoutNavbar from "./layouts/LayoutWithoutNavbar"
import Profile from "./pages/Profile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithNavbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "/",
    element: <LayoutWithoutNavbar />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <Error404 />,
      }, // Error 404 page route her zaman en aşağıda.
    ],
  },
])

export default router
