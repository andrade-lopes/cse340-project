import db from './db.js';

const getCategoryById = async (id) => {
    const result = await db.query(
        'SELECT * FROM categories WHERE category_id = $1',
        [id]
    );
    return result.rows[0];
};

const getAllCategories = async () => {
    const result = await db.query('SELECT * FROM categories ORDER BY category_name');
    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const sql = `
        SELECT p.*
        FROM projects p
        JOIN project_categories pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date
    `;
    const result = await db.query(sql, [categoryId]);
    return result.rows;
};

const createCategory = async (categoryName) => {
    const result = await db.query(
        'INSERT INTO categories (category_name) VALUES ($1) RETURNING *',
        [categoryName]
    );
    return result.rows[0];
};

const updateCategory = async (categoryId, categoryName) => {
    const result = await db.query(
        'UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *',
        [categoryName, categoryId]
    );
    return result.rows[0];
};

export default {
    getCategoryById,
    getAllCategories,
    getProjectsByCategoryId,
    createCategory,
    updateCategory
};