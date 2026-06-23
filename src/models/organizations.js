import db from './db.js';

const createOrganization = async (name, description, contactEmail, logoFilename) => {
    const query = `
        INSERT INTO organization (name, description, contact_email, logo_filename)
        VALUES ($1, $2, $3, $4)
        RETURNING organization_id
    `;
    const result = await db.query(query, [name, description, contactEmail, logoFilename]);
    if (result.rows.length === 0) throw new Error('Failed to create organization');
    return result.rows[0].organization_id;
};

const getAllOrganizations = async () => {
    const result = await db.query('SELECT * FROM organization ORDER BY name');
    return result.rows;
};

const getOrganizationById = async (id) => {
    const result = await db.query(
        'SELECT * FROM organization WHERE organization_id = $1',
        [id]
    );
    return result.rows[0];
};

export default { createOrganization, getAllOrganizations, getOrganizationById };