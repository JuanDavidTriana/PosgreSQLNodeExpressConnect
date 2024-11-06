const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.get('/estudiantes', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM estudiantes');
        res.json(response.rows);
    } catch (error) {
        console.error(error.message);    
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
})