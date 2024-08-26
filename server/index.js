
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 


const app = express();
app.use(express.json());



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Cgugr1gnbg321',
    port: 5432, 
});

pool.connect((err, client, done) => {
    if (err) {
        console.error('Помилка підключення до бази даних PostgreSQL:', err);
    } else {
        console.log('Підключено до бази даних PostgreSQL');
    }
});

 
app.get('/products', async (req, res) => {
    try {
        const query = "SELECT * FROM products";
        const result = await pool.query(query);

        const models = result.rows.map(row => ({
            ...row,
            image: row.image  
        }));

        res.status(200).json(models);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Server error');
    }
});

app.post('/products/postgresql', async (req, res) => {
    try {
        const { name, description, price } = req.body;

        const query = `
            INSERT INTO products (name, description, price)
            VALUES ($1, $2, $3)
        `;
        await pool.query(query, [name, description, price]);

        console.log(' Успішно збережено до PostgreSQL');
        res.status(200).send(' Успішно збережено до PostgreSQL');
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
