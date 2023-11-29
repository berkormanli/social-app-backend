import { createConnection } from 'mariadb';

export const mariadbconn = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwer',
    database: 'social_app'
});