import db from './db.js';
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const query = `
        INSERT INTO users (name, email, password_hash, role_id)
        VALUES (
            $1, $2, $3,
            (SELECT role_id FROM roles WHERE role_name = $4)
        )
        RETURNING user_id;
    `;
    const result = await db.query(query, [name, email, passwordHash, 'user']);
    if (result.rows.length === 0) throw new Error('Failed to create user');
    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT users.user_id, users.name, users.email,
               users.password_hash, users.role_id, roles.role_name
        FROM users
        JOIN roles ON users.role_id = roles.role_id
        WHERE users.email = $1
    `;
    const result = await db.query(query, [email]);
    return result.rows.length === 0 ? null : result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) return null;
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) return null;
    delete user.password_hash;
    return user;
};

export { createUser, authenticateUser };