import dotenv from 'dotenv';
import pg from 'pg';


dotenv.config();

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
export default pool;

const connect = async () => {
    try { 
        await pool.query('SELECT 1');
        console.log('Conectado a DB');
    } catch (error) {
        console.error('Error al conectar a DB', error);
    }
}

connect();