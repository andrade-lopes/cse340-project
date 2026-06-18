-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- ========================================
-- Roles Table
-- ========================================

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- ========================================
-- Insert Initial Roles
-- ========================================

INSERT INTO roles (role_name, role_description)
VALUES
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- ========================================
-- Users Table
-- ========================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- Categories Table
-- ========================================

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- ========================================
-- Projects Table
-- ========================================

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    project_date DATE,
    organization_id INTEGER REFERENCES organization(organization_id)
);

-- ========================================
-- Project Categories (Many-to-Many)
-- ========================================

CREATE TABLE project_categories (
    project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- ========================================
-- Volunteers Table (Many-to-Many: users <-> projects)
-- ========================================

CREATE TABLE volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, project_id)
);

-- ========================================
-- Sample Projects
-- ========================================

INSERT INTO projects (project_name, description, project_date, organization_id)
VALUES
(
    'Community Garden Build',
    'Help us build raised garden beds in the local park to promote food access and community engagement.',
    '2026-07-15',
    2
),
(
    'Neighborhood Cleanup',
    'Join us for a morning of cleaning up litter and beautifying our streets and parks.',
    '2026-08-01',
    3
),
(
    'Affordable Housing Renovation',
    'Assist skilled tradespeople in renovating homes for low-income families in need.',
    '2026-09-10',
    1
);

