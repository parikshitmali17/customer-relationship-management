// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {


//   return (
//     <>
     
//     </>
//   )
// }

// export default App


"use client"

// import { useState,useEffect } from "react"
// import "bootstrap/dist/css/bootstrap.min.css"
// import Navigation from "./Components/Navigation"
// import Dashboard from "./Components/Dashboard"
// import UserManagement from "./Components/UserManagement"
// import ContactManagement from "./Components/ContactManagement"
// import Reporting from "./components/Reporting"
// import { mockUsers, mockContacts } from "./data/mockData"

// /**
//  * Main App Component
//  * Manages the overall application state and routing between different sections
//  */
// export default function App() {
//   // State management for current active section
//   const [activeSection, setActiveSection] = useState("dashboard")
//   const router = useRouter()
//   // State management for users and contacts - ready for API integration
//   const [users, setUsers] = useState(mockUsers)
//   const [contacts, setContacts] = useState(mockContacts)
//    const [loggedIn, setLoggedIn] = useState(false) // Manage login state
//     const [isClient, setIsClient] = useState(false)

//   /**
//    * Handle user CRUD operations
//    * These functions are structured to easily integrate with API calls
//    */
//   useEffect(() => {
//     setIsClient(true)
//     // Check login status from localStorage
//     const storedLoginStatus = localStorage.getItem("loggedIn")
//     if (storedLoginStatus === "true") {
//       setLoggedIn(true)
//     } else {
//       router.push("/login") // Redirect to login if not logged in
//     }
//   }, [router])

//   const handleAddUser = (userData) => {
//     const newUser = {
//       ...userData,
//       id: Math.max(...users.map((u) => u.id)) + 1,
//     }
//     setUsers([...users, newUser])
//   }

//   const handleUpdateUser = (id, userData) => {
//     setUsers(users.map((user) => (user.id === id ? { ...userData, id } : user)))
//   }

//   const handleDeleteUser = (id) => {
//     setUsers(users.filter((user) => user.id !== id))
//     // Also remove contacts associated with this user
//     setContacts(contacts.filter((contact) => contact.userId !== id))
//   }

//   /**
//    * Handle contact CRUD operations
//    * These functions are structured to easily integrate with API calls
//    */
//   const handleAddContact = (contactData) => {
//     const newContact = {
//       ...contactData,
//       id: Math.max(...contacts.map((c) => c.id)) + 1,
//     }
//     setContacts([...contacts, newContact])
//   }

//   const handleUpdateContact = (id, contactData) => {
//     setContacts(contacts.map((contact) => (contact.id === id ? { ...contactData, id } : contact)))
//   }

//   const handleDeleteContact = (id) => {
//     setContacts(contacts.filter((contact) => contact.id !== id))
//   }

  
//   // Only render content if logged in and on client side
//   if (!isClient || !loggedIn) {
//     return null // Or a loading spinner
//   }

//   /**
//    * Render the appropriate component based on active section
//    */
//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case "dashboard":
//         return <Dashboard users={users} contacts={contacts} />
//       case "users":
//         return (
//           <UserManagement
//             users={users}
//             onAddUser={handleAddUser}
//             onUpdateUser={handleUpdateUser}
//             onDeleteUser={handleDeleteUser}
//           />
//         )
//       case "contacts":
//         return (
//           <ContactManagement
//             contacts={contacts}
//             users={users}
//             onAddContact={handleAddContact}
//             onUpdateContact={handleUpdateContact}
//             onDeleteContact={handleDeleteContact}
//           />
//         )
//       case "reports":
//         return <Reporting users={users} contacts={contacts} />
//       default:
//         return <Dashboard users={users} contacts={contacts} />
//     }
//   }

//   return (
//     <div className="d-flex min-vh-100">
//       {/* Navigation Sidebar */}
//       {/* <Navigation activeSection={activeSection} setActiveSection={setActiveSection} /> */}
//       <Navigation activeSection={activeSection} setActiveSection={setActiveSection} setLoggedIn={setLoggedIn} />

//       {/* Main Content Area */}
//       <div className="flex-grow-1 p-4 bg-light">{renderActiveSection()}</div>
//     </div>
//   )
// }


import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Navigation from "./Components/Navigation"
import Dashboard from "./Components/Dashboard"
import UserManagement from "./Components/UserManagement"
import ContactManagement from "./Components/ContactManagement"
import Reporting from "./components/Reporting"
import Login from "./Components/LogInPage"
import { mockUsers, mockContacts } from "./data/mockData"

const ProtectedApp = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [users, setUsers] = useState(mockUsers)
  const [contacts, setContacts] = useState(mockContacts)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsClient(true)
    const storedLoginStatus = localStorage.getItem("loggedIn")
    if (storedLoginStatus === "true") {
      setLoggedIn(true)
    } else {
      navigate("/login")
    }
  }, [navigate])

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
    setContacts(contacts.filter((contact) => contact.userId !== id))
  }

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

  if (!isClient || !loggedIn) return null

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

  return (
    <div className="d-flex min-vh-100">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} setLoggedIn={setLoggedIn} />
      <div className="flex-grow-1 p-4 bg-light">{renderActiveSection()}</div>
    </div>
  )
}

// Top-level component
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<ProtectedApp />} />
      </Routes>
    </Router>
  )
}
