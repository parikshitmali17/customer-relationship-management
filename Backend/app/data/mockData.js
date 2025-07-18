export const mockUsers = [
  {
    id: 1,
    name: "Emily Carter",
    email: "emily.carter@example.com",
    password: "password123", // In production, this would be hashed
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Ryan Foster",
    email: "ryan.foster@example.com",
    password: "password123",
    createdAt: "2024-01-16T14:20:00Z",
  },
  {
    id: 3,
    name: "Chloe Bennett",
    email: "chloe.bennett@example.com",
    password: "password123",
    createdAt: "2024-01-17T09:15:00Z",
  },
  {
    id: 4,
    name: "Owen Harper",
    email: "owen.harper@example.com",
    password: "password123",
    createdAt: "2024-01-18T16:45:00Z",
  },
  {
    id: 5,
    name: "Ava Reed",
    email: "ava.reed@example.com",
    password: "password123",
    createdAt: "2024-01-19T11:30:00Z",
  },
]

/**
 * Mock contacts data
 * In production, this would come from your backend API
 */
export const mockContacts = [
  {
    id: 1,
    name: "Isabella Hayes",
    email: "isabella.hayes@example.com",
    phone: "555-1234",
    userId: 1, // Assigned to Emily Carter
    createdAt: "2024-01-20T08:30:00Z",
  },
  {
    id: 2,
    name: "Noah Turner",
    email: "noah.turner@example.com",
    phone: "555-5678",
    userId: 2, // Assigned to Ryan Foster
    createdAt: "2024-01-21T10:15:00Z",
  },
  {
    id: 3,
    name: "Mia Parker",
    email: "mia.parker@example.com",
    phone: "555-9012",
    userId: 3, // Assigned to Chloe Bennett
    createdAt: "2024-01-22T14:20:00Z",
  },
  {
    id: 4,
    name: "Lucas Cooper",
    email: "lucas.cooper@example.com",
    phone: "555-3456",
    userId: 4, // Assigned to Owen Harper
    createdAt: "2024-01-23T09:45:00Z",
  },
  {
    id: 5,
    name: "Amelia Reed",
    email: "amelia.reed@example.com",
    phone: "555-7890",
    userId: 5, // Assigned to Ava Reed
    createdAt: "2024-01-24T13:10:00Z",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "555-2468",
    userId: 1, // Assigned to Emily Carter
    createdAt: "2024-01-25T11:30:00Z",
  },
  {
    id: 7,
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    phone: "555-1357",
    userId: 2, // Assigned to Ryan Foster
    createdAt: "2024-01-26T15:45:00Z",
  },
  {
    id: 8,
    name: "Ethan Brown",
    email: "ethan.brown@example.com",
    phone: "555-9753",
    userId: 3, // Assigned to Chloe Bennett
    createdAt: "2024-01-27T12:20:00Z",
  },
]
