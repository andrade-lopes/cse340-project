import db from './db.js';

const getProjectById = async (projectId) => {
    const sql = `
        SELECT p.*, o.name AS organization_name
        FROM projects p
        LEFT JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;
    const result = await db.query(sql, [projectId]);
    return result.rows[0];
};

const getAllProjects = async () => {
    const sql = `
        SELECT p.*, o.name AS organization_name
        FROM projects p
        LEFT JOIN organization o ON p.organization_id = o.organization_id
        ORDER BY p.project_date ASC
    `;
    const result = await db.query(sql);
    return result.rows;
};

export default { getProjectById, getAllProjects };