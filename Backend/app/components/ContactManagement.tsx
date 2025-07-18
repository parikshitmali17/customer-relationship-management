"use client"

import type React from "react"
import { useState, useMemo } from "react"
import type { Contact, User } from "../types/types"
import ContactModal from "./ContactModal"

interface ContactManagementProps {
  contacts: Contact[]
  users: User[]
  onAddContact: (contact: Omit<Contact, "id">) => void
  onUpdateContact: (id: number, contact: Omit<Contact, "id">) => void
  onDeleteContact: (id: number) => void
}

/**
 * Contact Management Component
 * Handles CRUD operations for contacts with search functionality
 */
const ContactManagement: React.FC<ContactManagementProps> = ({
  contacts,
  users,
  onAddContact,
  onUpdateContact,
  onDeleteContact,
}) => {
  // State management
  const [showModal, setShowModal] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAllContacts, setShowAllContacts] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const contactsPerPage = 10

  /**
   * Filter contacts based on search term (name or email)
   * Using useMemo for performance optimization
   */
  const filteredContacts = useMemo(() => {
    let filtered = contacts

    if (searchTerm.trim()) {
      filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [contacts, searchTerm])

  // Add pagination logic after filteredContacts
  const indexOfLastContact = currentPage * contactsPerPage
  const indexOfFirstContact = indexOfLastContact - contactsPerPage
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact)
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage)

  /**
   * Get user name by user ID
   */
  const getUserName = (userId: number): string => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : "Unknown User"
  }

  /**
   * Handle opening modal for adding new contact
   */
  const handleAddClick = () => {
    setEditingContact(null)
    setShowModal(true)
  }

  /**
   * Handle opening modal for editing existing contact
   */
  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact)
    setShowModal(true)
  }

  /**
   * Handle contact deletion with confirmation
   */
  const handleDeleteClick = (contact: Contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDeleteContact(contact.id)
    }
  }

  /**
   * Handle modal form submission
   */
  const handleModalSubmit = (contactData: Omit<Contact, "id">) => {
    if (editingContact) {
      onUpdateContact(editingContact.id, contactData)
    } else {
      onAddContact(contactData)
    }
    setShowModal(false)
    setEditingContact(null)
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h2>Contact Management</h2>
          <p className="text-muted">Manage your customer relationships and interactions.</p>
        </div>
        <div className="col-md-6 text-end">
          <button
            className={`btn ${showAllContacts ? "btn-secondary" : "btn-outline-success"} me-2`}
            onClick={() => setShowAllContacts(!showAllContacts)}
          >
            {showAllContacts ? "Show Summary" : "View All Contacts"}
          </button>
          <button className="btn btn-success" onClick={handleAddClick}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Contact
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search contacts by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="btn btn-outline-secondary" onClick={() => setSearchTerm("")} title="Clear search">
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="text-muted">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </span>
        </div>
      </div>

      {/* Contact Overview Card */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Contact Overview</h5>
              <span className="badge bg-success">{contacts.length} Total Contacts</span>
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
                      <th>Phone</th>
                      <th>Assigned User</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(showAllContacts ? currentContacts : filteredContacts.slice(0, 5)).length > 0 ? (
                      (showAllContacts ? currentContacts : filteredContacts.slice(0, 5)).map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div
                                className="avatar-circle bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{ width: "32px", height: "32px", fontSize: "14px" }}
                              >
                                {contact.name.charAt(0).toUpperCase()}
                              </div>
                              {contact.name}
                            </div>
                          </td>
                          <td>{contact.email}</td>
                          <td>{contact.phone}</td>
                          <td>
                            <span className="badge bg-info">{getUserName(contact.userId)}</span>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditClick(contact)}
                                title="Edit Contact"
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteClick(contact)}
                                title="Delete Contact"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center text-muted py-4">
                          {searchTerm
                            ? `No contacts found matching "${searchTerm}"`
                            : 'No contacts found. Click "Add Contact" to get started.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {showAllContacts && totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <small className="text-muted">
                      Showing {indexOfFirstContact + 1} to {Math.min(indexOfLastContact, filteredContacts.length)} of{" "}
                      {filteredContacts.length} contacts
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

      {/* Contact Modal for Add/Edit */}
      <ContactModal
        show={showModal}
        onHide={() => {
          setShowModal(false)
          setEditingContact(null)
        }}
        onSubmit={handleModalSubmit}
        contact={editingContact}
        users={users}
      />
    </div>
  )
}

export default ContactManagement
