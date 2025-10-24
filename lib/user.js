import db from "./db";

export function createUser(email, password) {
    // Simulate user creation logic
    const result = db
        .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
        .run(email, password);
    return result.lastInsertRowid
}