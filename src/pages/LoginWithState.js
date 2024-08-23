import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import axios from "axios"
import SendIcon from "@mui/icons-material/Send"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  console.log(username)

  const handleLogin = async () => {
    try {
      //usename veya şifre input boş olursa istek atmaz
      if (username != "" || password != "") {
        //key (sol) backend value (sağ) frontu temsil ediyor
        let requestObj = {
          username: username,
          password: password,
        }
        //backend bizden post istediği için
        let response = await axios.post(
          "http://localhost:9000/user/login",
          requestObj
        )
        console.log(response.data)
      }
    } catch (error) {
      console.log("Login Error", error.response.data.message)
      //Şifre veya username yanlış olursa input kutusunu boşaltır
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div>
          <TextField
            variant="standard"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="my-4">
          <TextField
            variant="standard"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={handleLogin}
            //icon import edilir 
            endIcon={<SendIcon />}>
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
