import db from './db.js';

const addVolunteer = async (userId, projectId) => {
  const sql = `
        INSERT INTO volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
        RETURNING *;
    `;
  return await db.query(sql, [userId, projectId]);
};

const removeVolunteer = async (userId, projectId) => {
  await db.query(
    'DELETE FROM volunteers WHERE user_id = $1 AND project_id = $2',
    [userId, projectId]
  );
};

const getUserProjects = async (userId) => {
  const sql = `
        SELECT p.*
        FROM projects p
        JOIN volunteers v ON p.project_id = v.project_id
        WHERE v.user_id = $1
        ORDER BY p.project_name
    `;
  const result = await db.query(sql, [userId]);
  return result.rows;
};

const isVolunteer = async (userId, projectId) => {
  const result = await db.query(
    'SELECT 1 FROM volunteers WHERE user_id = $1 AND project_id = $2',
    [userId, projectId]
  );
  return result.rowCount > 0;
};

export default { addVolunteer, removeVolunteer, getUserProjects, isVolunteer };