CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- In a real application, store hashed passwords!
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Optional: Seed some initial data for testing
INSERT INTO users (name, email, password) VALUES
('Emily Carter', 'emily.carter@example.com', 'password123'),
('Ryan Foster', 'ryan.foster@example.com', 'password123'),
('Chloe Bennett', 'chloe.bennett@example.com', 'password123'),
('Owen Harper', 'owen.harper@example.com', 'password123'),
('Ava Reed', 'ava.reed@example.com', 'password123');

INSERT INTO contacts (name, email, phone, user_id) VALUES
('Isabella Hayes', 'isabella.hayes@example.com', '555-1234', 1),
('Noah Turner', 'noah.turner@example.com', '555-5678', 2),
('Mia Parker', 'mia.parker@example.com', '555-9012', 3),
('Lucas Cooper', 'lucas.cooper@example.com', '555-3456', 4),
('Amelia Reed', 'amelia.reed@example.com', '555-7890', 5),
('James Wilson', 'james.wilson@example.com', '555-2468', 1),
('Sophia Davis', 'sophia.davis@example.com', '555-1357', 2),
('Ethan Brown', 'ethan.brown@example.com', '555-9753', 3);
