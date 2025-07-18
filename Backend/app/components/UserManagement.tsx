import type React from "react"
import { useState } from "react"
import type { User } from "../types/types"
import UserModal from "./UserModal"

interface UserManagementProps {
  users: User[]
  onAddUser: (user: Omit<User, "id">) => void
  onUpdateUser: (id: number, user: Omit<User, "id">) => void
  onDeleteUser: (id: number) => void
}

/**
 * User Management Component
 * Handles CRUD operations for users with a responsive table interface
 */
const UserManagement: React.FC<UserManagementProps> = ({ users, onAddUser, onUpdateUser, onDeleteUser }) => {
  // Modal state management
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showAllUsers, setShowAllUsers] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)

  /**
   * Handle opening modal for adding new user
   */
  const handleAddClick = () => {
    setEditingUser(null)
    setShowModal(true)
  }

  /**
   * Handle opening modal for editing existing user
   */
  const handleEditClick = (user: User) => {
    setEditingUser(user)
    setShowModal(true)
  }

  /**
   * Handle user deletion with confirmation
   */
  const handleDeleteClick = (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDeleteUser(user.id)
    }
  }

  /**
   * Handle modal form submission
   */
  const handleModalSubmit = (userData: Omit<User, "id">) => {
    if (editingUser) {
      onUpdateUser(editingUser.id, userData)
    } else {
      onAddUser(userData)
    }
    setShowModal(false)
    setEditingUser(null)
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2>User Management</h2>
          <p className="text-muted">Manage your team members and their access levels.</p>
        </div>
        <div className="col-md-4 text-end">
          <button
            className={`btn ${showAllUsers ? "btn-secondary" : "btn-outline-primary"}`}
            onClick={() => setShowAllUsers(!showAllUsers)}
          >
            {showAllUsers ? "Show Summary" : "View All Users"}
          </button>
          <button className="btn btn-primary ms-2" onClick={handleAddClick}>
            <i className="bi bi-plus-circle me-2"></i>
            Add User
          </button>
        </div>
      </div>

      {/* User Overview Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">User Overview</h5>
              <span className="badge bg-primary">{users.length} Total Users</span>
            </div>
            <div className="card-body">
              {/* Responsive Table */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(showAllUsers ? currentUsers : users.slice(0, 5)).length > 0 ? (
                      (showAllUsers ? currentUsers : users.slice(0, 5)).map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div
                                className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{ width: "32px", height: "32px", fontSize: "14px" }}
                              >
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              {user.name}
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditClick(user)}
                                title="Edit User"
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteClick(user)}
                                title="Delete User"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center text-muted py-4">
                          No users found. Click "Add User" to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {showAllUsers && totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <small className="text-muted">
                      Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length}{" "}
                      users
                    </small>
                  </div>
                  <nav>
                    <ul className="pagination pagination-sm mb-0">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                          <button className="page-link" onClick={() => setCurrentPage(page)}>
                            {page}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Modal for Add/Edit */}
      <UserModal
        show={showModal}
        onHide={() => {
          setShowModal(false)
          setEditingUser(null)
        }}
        onSubmit={handleModalSubmit}
        user={editingUser}
      />
    </div>
  )
}

export default UserManagement
