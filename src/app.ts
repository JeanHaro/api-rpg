import express from 'express';
import cors from 'cors';

// Rutas
import charactersRouter from './routes/characters.routes';

const app = express();
const PORT = 3000;

// Midleware - permite leer JSON del body
app.use(express.json());

// Cors
app.use(cors());

// Rutas
app.use('/characters', charactersRouter);

// Ruta base
app.get('/', ( req, res ) => {
    res.json({
        message: 'RPG API activa'
    });
})

app.listen( PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});