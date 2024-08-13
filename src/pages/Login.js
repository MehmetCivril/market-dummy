import { Button, TextField } from "@mui/material"
import React from "react"

function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div>
          <TextField variant="standard" label="Username" />
        </div>
        <div>
          <TextField variant="standard" label="Password" />
        </div>
        <Button variant="outlined">Login</Button>
      </div>
    </div>
  )
}

export default Login
