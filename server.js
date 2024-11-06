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

app.get('/estudiantes/:id', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM estudiantes WHERE estudiante_id = $1', [req.params.id]);
        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.json(response.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/inscripciones/:materia', async (req, res) => {
    try {
        const response = await pool.query(`
            SELECT e.nombre, e.email, c.nombre AS curso
            FROM inscripciones i
            INNER JOIN estudiantes e ON i.estudiante_id = e.estudiante_id
            INNER JOIN cursos c ON i.curso_id = c.curso_id
            WHERE c.nombre = $1
        `, [req.params.materia]);
        res.json(response.rows);
    } catch (error) {
        console.error(error.message);
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
})