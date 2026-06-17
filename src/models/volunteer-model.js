const pool = require("../database");

async function addVolunteer(userId, projectId) {
    const sql = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id)
    DO NOTHING
    RETURNING *;
  `;

    return await pool.query(sql, [userId, projectId]);
}

async function removeVolunteer(userId, projectId) {
    const sql = `
    DELETE FROM volunteers
    WHERE user_id = $1
    AND project_id = $2;
  `;

    return await pool.query(sql, [userId, projectId]);
}

async function getUserProjects(userId) {
    const sql = `
    SELECT p.*
    FROM projects p
    JOIN volunteers v
      ON p.project_id = v.project_id
    WHERE v.user_id = $1
    ORDER BY p.project_name;
  `;

    const data = await pool.query(sql, [userId]);
    return data.rows;
}

async function isVolunteer(userId, projectId) {
    const sql = `
    SELECT *
    FROM volunteers
    WHERE user_id = $1
      AND project_id = $2;
  `;

    const data = await pool.query(sql, [userId, projectId]);
    return data.rowCount > 0;
}

module.exports = {
    addVolunteer,
    removeVolunteer,
    getUserProjects,
    isVolunteer,
};