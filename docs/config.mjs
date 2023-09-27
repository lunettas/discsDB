import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.dev');

dotenv.config({ path: envPath });

// Access the environment variables and export them
export const DATABASE = process.env.DATABASE;
export const HOST = process.env.HOST;
export const USERNAME = process.env.USERNAME;
export const PASSWORD = process.env.PASSWORD;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const SERVER_IP_ADDRESS = process.env.SERVER_IP_ADDRESS;
export const SSL_KEY_PATH = process.env.SSL_KEY_PATH;
export const SSL_CERT_PATH = process.env.SSL_CERT_PATH;
export const SSL_CA_PATH = process.env.SSL_CA_PATH;
export const PORT = process.env.PORT;