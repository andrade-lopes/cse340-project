import pool from "./db.js";

/**
 * Creates a new organization in the database.
 * @param {string} name
 * @param {string} description
 * @param {string} contactEmail
 * @param {string} logoFilename
 * @returns {string} The id of the newly created organization record.
 */
const createOrganization = async (
    name,
    description,
    contactEmail,
    logoFilename
) => {
    const query = `
      INSERT INTO organization (name, description, contact_email, logo_filename)
      VALUES ($1, $2, $3, $4)
      RETURNING organization_id
    `;

    const queryParams = [
        name,
        description,
        contactEmail,
        logoFilename
    ];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error("Failed to create organization");
    }

    if (process.env.ENABLE_SQL_LOGGING === "true") {
        console.log(
            "Created new organization with ID:",
            result.rows[0].organization_id
        );
    }

    return result.rows[0].organization_id;
};

export default {
    createOrganization
};