const express = require('express');
const app = express();
const path = require('path');

const port = Number(process.env.PORT ?? 0); //; puerto del servidor

app.use(express.urlencoded({ extended: true })) //; para manejar datos de formularios
app.use(express.json()); //; para manejar datos JSON

//; sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

//; página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Index.html'));
    console.log('Request received', req.url);
});

//; ruta para la vista de inventario
app.get('/inventario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Inventario.html'));
    console.log('Request received', req.url);
});

//; manejo de rutas no encontradas (siempre al final)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


const server = app.listen(port, () => {//; el servidor escucha en el puerto definido
    const actualPort = server.address().port; //; obtiene el puerto asignado
    console.log(`Server running at http://localhost:${actualPort}/`); //; muestra en consola la url del servidor
});
