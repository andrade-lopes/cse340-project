import pool from "./db.js";

async function getCategoryById(id) {
    const sql = `
        SELECT *
        FROM categories
        WHERE category_id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
}

async function getProjectsByCategoryId(categoryId) {
    const sql = `
        SELECT sp.*
        FROM service_projects sp
        JOIN project_categories pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.project_date
    `;

    const result = await pool.query(sql, [categoryId]);
    return result.rows;
}

async function getCategoriesByProjectId(projectId) {
    const sql = `
        SELECT c.*
        FROM categories c
        JOIN project_categories pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_name
    `;

    const result = await pool.query(sql, [projectId]);
    return result.rows;
}

async function createCategory(categoryName) {
    const sql = `
        INSERT INTO categories (
            category_name
        )
        VALUES ($1)
        RETURNING *
    `;

    const result =
        await pool.query(sql, [categoryName]);

    return result.rows[0];
}

async function updateCategory(
    categoryId,
    categoryName
) {
    const sql = `
        UPDATE categories
        SET category_name = $1
        WHERE category_id = $2
        RETURNING *
    `;

    const result =
        await pool.query(sql, [
            categoryName,
            categoryId
        ]);

    return result.rows[0];
}

export default {
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    createCategory,
    updateCategory
};