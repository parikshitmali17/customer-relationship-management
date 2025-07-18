import { useNavigate } from "react-router-dom"
const Navigation = ({ activeSection, setActiveSection }) => {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "contacts", label: "Contact Management", icon: "📞" },
    { id: "reports", label: "Reporting", icon: "📈" },
  ]

  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("loggedIn")
    // setLoggedIn(false)
    navigate("/login")
  }

  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
      {/* CRM Header */}
      <div className="mb-4">
        <h3 className="text-center mb-3">CRM</h3>
        <hr className="text-white" />
      </div>

      {/* Welcome Message */}
      <div className="mb-4">
        <p className="mb-1">Welcome back,</p>
        <h5 className="text-info">Sarah!</h5>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="list-unstyled">
          {navigationItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                className={`btn w-100 text-start d-flex align-items-center ${
                  activeSection === item.id ? "btn-primary" : "btn-outline-light"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Actions Section */}
      {/* <div className="mt-4">
        <h6 className="text-muted">Quick Actions</h6>
        <div className="d-grid gap-2">
          <button className="btn btn-sm btn-success" onClick={() => setActiveSection("users")}>
            Add User
          </button>
          <button className="btn btn-sm btn-info" onClick={() => setActiveSection("contacts")}>
            Add Contact
          </button>
        </div>
      </div> */}
       {/* Logout Button */}
      <div className="mt-auto pt-3">
        <button className="btn btn-outline-light w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navigation
