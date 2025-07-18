"use client"

import { useState } from "react"
import UserModal from "./UserModal"
import SuccessModal from "./SuccessModal"
import ConfirmationModal from "./ConfirmationModal" // Import new component

/**
 * User Management Component
 * Handles CRUD operations for users with a responsive table interface
 */
const UserManagement = ({ users, onAddUser, onUpdateUser, onDeleteUser }) => {
  // Modal state management
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [showAllUsers, setShowAllUsers] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false) // New state for confirmation
  const [userToDelete, setUserToDelete] = useState(null) // New state to store user to delete

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
  const handleEditClick = (user) => {
    setEditingUser(user)
    setShowModal(true)
  }

  /**
   * Handle user deletion with confirmation
   */
  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowConfirmModal(true)
  }

  /**
   * Handle confirmation of user deletion
   */
  const handleConfirmDeleteUser = () => {
    if (userToDelete) {
      onDeleteUser(userToDelete.id)
      setSuccessMessage(`User "${userToDelete.name}" deleted successfully!`)
      setShowSuccessModal(true)
      setUserToDelete(null)
    }
    setShowConfirmModal(false)
  }

  /**
   * Handle modal form submission
   */
  const handleModalSubmit = (userData) => {
    if (editingUser) {
      onUpdateUser(editingUser.id, userData)
    } else {
      onAddUser(userData)
      setSuccessMessage("New user added successfully!")
      setShowSuccessModal(true)
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

      {/* Confirmation Modal for Delete User */}
      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDeleteUser}
        title="Confirm User Deletion"
        message={`Are you sure you want to delete user "${userToDelete?.name}"? This action cannot be undone.`}
      />

      {/* New User Added Success Modal */}
      <SuccessModal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} message={successMessage} />
    </div>
  )
}

export default UserManagement
