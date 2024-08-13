import React from "react"
import { Link } from "react-router-dom"

function Error404() {
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-red-400 text-6xl"> Error 404 </h1>
        <h1 className="text-red-400 text-4xl"> Page Not Found </h1>
        {/* Anasayfaya Yönlendirir! */}
        <div className="mt-10">
          <Link
            to={"/"}
            className="bg-blue-600 text-white hover:bg-blue-400 border-r-6 p-4">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error404
