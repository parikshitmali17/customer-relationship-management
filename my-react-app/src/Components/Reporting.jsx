import { useState } from "react"

/**
 * Reporting Component
 * Displays analytics and reports for the CRM system
 */
const Reporting = ({ users, contacts }) => {
  const [showFullReport, setShowFullReport] = useState(false)

  /**
   * Calculate contact distribution among users
   */
  const getContactDistribution = () => {
    return users
      .map((user) => {
        const userContacts = contacts.filter((contact) => contact.userId === user.id)
        return {
          user,
          contactCount: userContacts.length,
        }
      })
      .sort((a, b) => b.contactCount - a.contactCount)
  }

  /**
   * Get recently added contacts (last 5)
   */
  const getRecentlyAddedContacts = () => {
    const sorted = contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return showFullReport ? sorted : sorted.slice(0, 5)
  }

  const contactDistribution = getContactDistribution()
  const recentContacts = getRecentlyAddedContacts()

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2>Reporting</h2>
          <p className="text-muted">Analytics and insights for your CRM data.</p>
        </div>
        <div className="col-md-4 text-end">
          <button
            className={`btn ${showFullReport ? "btn-secondary" : "btn-outline-primary"}`}
            onClick={() => setShowFullReport(!showFullReport)}
          >
            {showFullReport ? "Show Summary" : "View Full Report"}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h3>{users.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5>Total Contacts</h5>
              <h3>{contacts.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h5>Avg Contacts/User</h5>
              <h3>{users.length > 0 ? Math.round(contacts.length / users.length) : 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {showFullReport && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Detailed Analytics</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Contact Growth Over Time</h6>
                    <div className="mb-3">
                      {(() => {
                        const last7Days = Array.from({ length: 7 }, (_, i) => {
                          const date = new Date()
                          date.setDate(date.getDate() - i)
                          return date.toISOString().split("T")[0]
                        }).reverse()

                        return last7Days.map((date) => {
                          const count = contacts.filter((contact) => contact.createdAt.split("T")[0] === date).length

                          return (
                            <div key={date} className="d-flex justify-content-between align-items-center mb-2">
                              <span>{new Date(date).toLocaleDateString()}</span>
                              <div className="d-flex align-items-center">
                                <div className="progress me-2" style={{ width: "100px", height: "20px" }}>
                                  <div className="progress-bar bg-success" style={{ width: `${count * 20}%` }}></div>
                                </div>
                                <span className="badge bg-success">{count}</span>
                              </div>
                            </div>
                          )
                        })
                      })()}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>User Performance</h6>
                    <div className="mb-3">
                      {contactDistribution.slice(0, 3).map(({ user, contactCount }) => (
                        <div key={user.id} className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <div
                              className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                              style={{ width: "24px", height: "24px", fontSize: "12px" }}
                            >
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{user.name}</span>
                          </div>
                          <span className="badge bg-primary">{contactCount} contacts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {/* Contact Distribution - Full Width */}
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Contact Distribution</h5>
              <small className="text-muted">See how contacts are distributed among users</small>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Number of Contacts</th>
                      <th>Percentage</th>
                      <th>Visual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactDistribution.map(({ user, contactCount }) => {
                      const percentage = contacts.length > 0 ? Math.round((contactCount / contacts.length) * 100) : 0

                      return (
                        <tr key={user.id}>
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
                          <td>
                            <span className="badge bg-primary">{contactCount}</span>
                          </td>
                          <td>{percentage}%</td>
                          <td>
                            <div className="progress" style={{ height: "20px" }}>
                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: `${percentage}%` }}
                                aria-valuenow={percentage}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                {percentage > 10 && `${percentage}%`}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {contactDistribution.length === 0 && (
                <div className="text-center text-muted py-4">
                  No data available. Add users and contacts to see distribution.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recently Added Contacts - Below Distribution Table */}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recently Added Contacts</h5>
              <div className="d-flex gap-2">
                <span className="badge bg-warning">{recentContacts.length} contacts</span>
                {showFullReport && (
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => {
                      const csvContent =
                        "data:text/csv;charset=utf-8," +
                        "Name,Email,Phone,Assigned User,Date Added\n" +
                        recentContacts
                          .map((contact) => {
                            const user = users.find((u) => u.id === contact.userId)
                            return `${contact.name},${contact.email},${contact.phone},${user?.name || "Unknown"},${new Date(contact.createdAt).toLocaleDateString()}`
                          })
                          .join("\n")

                      const encodedUri = encodeURI(csvContent)
                      const link = document.createElement("a")
                      link.setAttribute("href", encodedUri)
                      link.setAttribute("download", "contacts_report.csv")
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    title="Export to CSV"
                  >
                    📥 Export
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              {recentContacts.length > 0 ? (
                <div className="row">
                  {recentContacts.map((contact) => {
                    const user = users.find((u) => u.id === contact.userId)
                    return (
                      <div key={contact.id} className="col-md-6 col-lg-4 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex align-items-start">
                              <div
                                className="avatar-circle bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px", fontSize: "16px" }}
                              >
                                {contact.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-1">{contact.name}</h6>
                                <p className="mb-1 text-muted small">{contact.email}</p>
                                <p className="mb-1 text-muted small">{contact.phone}</p>
                                <small className="text-muted">Assigned to: {user?.name || "Unknown"}</small>
                                <br />
                                <small className="text-muted">
                                  Added: {new Date(contact.createdAt).toLocaleDateString()}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <p>No recent contacts found.</p>
                  <small>Add some contacts to see them here.</small>
                </div>
              )}

              {recentContacts.length > 0 && (
                <div className="text-center mt-3">
                  <button
                    className={`btn btn-sm ${showFullReport ? "btn-secondary" : "btn-outline-primary"}`}
                    onClick={() => setShowFullReport(!showFullReport)}
                  >
                    {showFullReport ? "Show Summary" : "View Full Report"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reporting
