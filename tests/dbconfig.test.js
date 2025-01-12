const db = require('../src/config/dbconfig');

describe('Database Connection', () => {
    afterAll(async () => {
        await db.end();
    });

    test('should connect to database successfully', async () => {
        try {
            const [rows] = await db.query('SELECT 1 AS result');
            expect(rows[0].result).toBe(1);
        } catch (error) {
            throw new error('Unable to connect to database');
        }
    });
});