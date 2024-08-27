import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Error404 from "./pages/Error404"
import Cart from "./pages/Cart"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {path: "/cart", element: <Cart /> },
  { path: "*", element: <Error404 /> }, // Error 404 page route her zaman en aşağıda.
])

export default router
