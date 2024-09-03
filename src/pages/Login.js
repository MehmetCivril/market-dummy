import React, { useState } from "react"
import { Button, InputAdornment, TextField } from "@mui/material"
import axios from "axios"
import SendIcon from "@mui/icons-material/Send"
import { Formik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import bg from "../assets/images/login-bg.jpg"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { handleLogin } from "../store/slices/userSlice"

// Yup ile login formunda gerekli olan validationlar hazırladık.
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username is too short!")
    .max(20, "Username is too long!"),
  password: Yup.string()
    .required("Password is required")
    .min(2, "Password is too short!"),
})

// Formik ile login formunu hazırladık.
function Login() {
  // navigate hooku react-router-dom'daki useNavigate fonksiyonunu kullanarak sayfa değiştirme işlemlerini yapacağız.
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isShow, setIsShow] = useState(false)

  const setLogin = async (loginOject) => {
    try {
      let response = await axios.post(
        "http://localhost:9000/user/login",
        loginOject
      )

      // Giriş başarılıysa "/" sayfasına yönlendirdik.
      if (response.data.status) {
        // Toastify ile success mesajı gösterdik.
        toast.success(response.data.message)
        // Access token'ı local storage'a kaydettik.
        localStorage.setItem("access_token", response.data.access_token)
        // Access token'ı decode ederek user bilgilerini aldık.
        dispatch(handleLogin(response.data.user))
        // Giriş yaptığımızda "/" sayfasına yönlendirdik.
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Login Error", error.response.data.message)
    }
  }

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url( ${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <div
        style={{ minWidth: "300px" }}
        className="border-gray-300 border-2 p-6 rounded-lg bg-gray-300 bg-opacity-30">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(value) => setLogin(value)}
          validationSchema={loginSchema}>
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
          }) => (
            <>
              <div>
                <TextField
                  variant="standard"
                  label="Username"
                  fullWidth
                  value={values.username}
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")}
                  error={touched.username && Boolean(errors.username)}
                  // username inputu içinde en az 3 karakter ve en fazla 20 karakter olması gerekiyor.
                  helperText={touched.username && errors.username}
                />
              </div>
              <div className="my-4">
                <TextField
                  variant="standard"
                  label="Password"
                  type={isShow ? "text" : "password"}
                  fullWidth
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setIsShow(!isShow)}>
                        {isShow ? <VisibilityOff /> : <Visibility />}

                        {/* {isShow ? (
                          <VisibilityOff onClick={() => setIsShow(!isShow)} />
                        ) : (
                          <Visibility onClick={() => setIsShow(!isShow)} />
                        )} */}

                        {/* {isShow ? (
                          <VisibilityOff onClick={() => setIsShow(false)} />
                        ) : (
                          <Visibility onClick={() => setIsShow(true)} />
                        )} */}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <span className="my-3 text-sm">
                Don't have an account?
                <Link to="/register" className="underline text-blue-800 ml-1">
                  Create Now!
                </Link>
              </span>
              <div className="flex justify-center mt-3">
                <Button
                  variant="outlined"
                  onClick={handleSubmit}
                  type="submit"
                  endIcon={<SendIcon />}>
                  Login
                </Button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
