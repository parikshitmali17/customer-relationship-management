import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import "bootstrap/dist/css/bootstrap.min.css"
import Navigation from "./components/Navigation"
import Dashboard from "./components/Dashboard"
import UserManagement from "./components/UserManagement"
import ContactManagement from "./components/ContactManagement"
import Reporting from "./components/Reporting"
import { mockUsers, mockContacts } from "./data/mockData"

/**
 * Main App Component
 * Manages the overall application state and routing between different sections
 */
export default function App() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false) // Manage login state
  const [activeSection, setActiveSection] = useState("dashboard")

  // State management for users and contacts - ready for API integration
  const [users, setUsers] = useState(mockUsers)
  const [contacts, setContacts] = useState(mockContacts)

  useEffect(() => {
    setIsClient(true)
    // Check login status from localStorage
    const storedLoginStatus = localStorage.getItem("loggedIn")
    if (storedLoginStatus === "true") {
      setLoggedIn(true)
    } else {
      router.push("/login") // Redirect to login if not logged in
    }
  }, [router])

  /**
   * Handle user CRUD operations
   * These functions are structured to easily integrate with API calls
   */
  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: Math.max(...users.map((u) => u.id)) + 1,
    }
    setUsers([...users, newUser])
  }

  const handleUpdateUser = (id, userData) => {
    setUsers(users.map((user) => (user.id === id ? { ...userData, id } : user)))
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    // Also remove contacts associated with this user
    setContacts(contacts.filter((contact) => contact.userId !== id))
  }

  /**
   * Handle contact CRUD operations
   * These functions are structured to easily integrate with API calls
   */
  const handleAddContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: Math.max(...contacts.map((c) => c.id)) + 1,
    }
    setContacts([...contacts, newContact])
  }

  const handleUpdateContact = (id, contactData) => {
    setContacts(contacts.map((contact) => (contact.id === id ? { ...contactData, id } : contact)))
  }

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  /**
   * Render the appropriate component based on active section
   */
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard users={users} contacts={contacts} />
      case "users":
        return (
          <UserManagement
            users={users}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        )
      case "contacts":
        return (
          <ContactManagement
            contacts={contacts}
            users={users}
            onAddContact={handleAddContact}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
          />
        )
      case "reports":
        return <Reporting users={users} contacts={contacts} />
      default:
        return <Dashboard users={users} contacts={contacts} />
    }
  }

  // Only render content if logged in and on client side
  if (!isClient || !loggedIn) {
    return null // Or a loading spinner
  }

  return (
    <div className="d-flex min-vh-100">
      {/* Navigation Sidebar */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} setLoggedIn={setLoggedIn} />

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 bg-light">{renderActiveSection()}</div>
    </div>
  )
}
