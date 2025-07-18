"use client"

/**
 * Dashboard Component
 * Displays key performance indicators and overview of the CRM system
 */
const Dashboard = ({ users, contacts }) => {
  // Calculate KPIs
  const totalUsers = users.length
  const totalContacts = contacts.length
  const recentContacts = contacts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3">Dashboard</h2>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-3">Key Performance Indicators</h4>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Total Users</h5>
              <h2 className="display-4">{totalUsers}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Total Contacts</h5>
              <h2 className="display-4">{totalContacts}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Newly Added Contacts</h5>
              <h2 className="display-4">{recentContacts.length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Task Management Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-3">Task Management</h4>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Onboarding</h5>
              <p className="card-text">Follow up with new users to ensure successful onboarding.</p>
              <button className="btn btn-primary">View Tasks</button>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Contact Engagement</h5>
              <p className="card-text">Engage with contacts to nurture relationships and drive conversions.</p>
              <button className="btn btn-primary">View Tasks</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recently Added Contacts</h5>
            </div>
            <div className="card-body">
              {recentContacts.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentContacts.map((contact) => {
                    const user = users.find((u) => u.id === contact.userId)
                    return (
                      <div
                        key={contact.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <h6 className="mb-1">{contact.name}</h6>
                          <p className="mb-1 text-muted">{contact.email}</p>
                          <small className="text-muted">Assigned to: {user?.name || "Unknown"}</small>
                        </div>
                        <small className="text-muted">{new Date(contact.createdAt).toLocaleDateString()}</small>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-muted">No recent contacts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
