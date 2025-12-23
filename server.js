const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

// Carpeta pública
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});

// Ruta API
//app.get('/ipoint-proyecto/inventory', (req, res) => {
  //const filePath = path.join(__dirname, 'inventory.json');

  //fs.readFile(filePath, 'utf8', (err, data) => {
    //if (err) {
      //console.error('Error leyendo inventario:', err);
      //return res.status(500).json({ error: 'No se pudo leer el inventario' });
    //}

    //res.type('application/json').send(data);
  //});
//});


