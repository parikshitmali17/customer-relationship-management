"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * LoginPage Component
 * Provides a simple login form with hardcoded credentials.
 */
const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    // Hardcoded credentials
    const ADMIN_USERNAME = "admin"
    const ADMIN_PASSWORD = "password"

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Simulate successful login
      localStorage.setItem("loggedIn", "true")
      navigate("/")
    } else {
      setError("Invalid username or password.")
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="row w-100" style={{ maxWidth: "900px" }}>
        {/* Left Section - Placeholder Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-primary text-white p-5 rounded-start">
          <img src="../public/vconnectideees_logo.jpeg" alt="Login Illustration" className="img-fluid" />
        </div>
        {/* src="/placeholder.svg?height=300&width=300" */}

        {/* Right Section - Login Form */}
        <div className="col-md-6 bg-white p-5 rounded-end shadow-lg">
          <h2 className="text-center mb-4">Welcome back</h2>
          <p className="text-center text-muted mb-4">Enter your credentials to access the dashboard.</p>

          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            {/* Login Button */}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-muted mt-3">
            Don't have an account?{" "}
            <a href="#" className="text-decoration-none">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
