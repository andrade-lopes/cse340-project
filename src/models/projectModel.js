async function getProjectById(projectId) {
    const sql = `
        SELECT *
        FROM projects
        WHERE project_id = $1
    `;

    const result =
        await pool.query(sql, [projectId]);

    return result.rows[0];
}

export default {
    getProjectById
};