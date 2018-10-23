const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
	'CREATE TABLE user(id SERIAL PRIMARY KEY, user_name VARCHAR(50) not null,user_password VARCHAR(50) not null, user_email VARCHAR(60) not null)');

query.on('end',() => {client.end();});