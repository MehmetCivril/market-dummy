import React from "react"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { handleLogin } from "../store/slices/userSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

function LayoutWithNavbar() {
  const dispatch = useDispatch()

  useEffect(() => {
    checkToken()
  }, []) // Token kontrolü her render edildiğinde yapılır.

  const checkToken = () => {
    let token = localStorage.getItem("access_token")
    if (token) {
      let decoded = jwtDecode(token)
      const d = new Date()
      let currentTime = d.getTime() / 1000
      let tokenExpireTime = decoded.exp
      if (tokenExpireTime > currentTime) {
        dispatch(handleLogin(decoded))
      } else {
        localStorage.removeItem("access_token")
      }
    }
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default LayoutWithNavbar
