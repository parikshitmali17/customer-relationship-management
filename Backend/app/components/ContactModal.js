"use client"

import { useState, useEffect } from "react"

/**
 * Contact Modal Component
 * Handles add/edit contact form in a Bootstrap modal
 */
const ContactModal = ({ show, onHide, onSubmit, contact, users }) => {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userId: 0,
  })

  const [errors, setErrors] = useState({})

  /**
   * Reset form when modal opens/closes or contact changes
   */
  useEffect(() => {
    if (show) {
      if (contact) {
        // Editing existing contact
        setFormData({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          userId: contact.userId,
        })
      } else {
        // Adding new contact
        setFormData({
          name: "",
          email: "",
          phone: "",
          userId: users.length > 0 ? users[0].id : 0,
        })
      }
      setErrors({})
    }
  }, [show, contact, users])

  /**
   * Handle input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number.parseInt(value) : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!/^\d{3}-\d{4}$/.test(formData.phone) && !/^$$\d{3}$$\s\d{3}-\d{4}$/.test(formData.phone)) {
      // Allow formats like 555-1234 or (555) 123-4567
      if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone number is invalid"
      }
    }

    if (!formData.userId || formData.userId === 0) {
      newErrors.userId = "Please select a user"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        userId: formData.userId,
        createdAt: contact?.createdAt || new Date().toISOString(),
      }

      onSubmit(contactData)
    }
  }

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{contact ? "Edit Contact" : "Add New Contact"}</h5>
            <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Name Field */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter contact name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Phone Field */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="555-1234"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                <div className="form-text">Format: 555-1234 or (555) 123-4567</div>
              </div>

              {/* User Assignment Field */}
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                  Assign to User <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.userId ? "is-invalid" : ""}`}
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                >
                  <option value={0}>Select a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
                {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                {contact ? "Update Contact" : "Add Contact"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
