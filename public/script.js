import baseDatos from './products.json' assert { type: 'json' };

// Función para buscar un Mac
const buscarMac = () => {
    const tipoBusqueda = document.querySelector('input[name="tipoBusqueda"]:checked').value;
    const dato = document.getElementById("datoInput").value.trim().toLowerCase();
    const resultadoDiv = document.getElementById("resultado");

    // Validación: dato vacío
    if (!dato) {
        resultadoDiv.innerHTML = "<p class='error'>Por favor ingresa un número de serie o nombre de modelo.</p>";
        return;
    }

    let macEncontrada = null;

    // 1. Búsqueda por número de serie
    if (tipoBusqueda === "serial") {
        macEncontrada = baseDatos[dato.toUpperCase()] || null;
    } 
    
    // 2. Búsqueda por modelo, cpu, ram, etc.
    else {
        for (let serial in baseDatos) {
            const mac = baseDatos[serial];

            // Validar que la propiedad exista antes de buscar
            if (mac[tipoBusqueda] && mac[tipoBusqueda].toLowerCase() === dato) {
                macEncontrada = mac;
                break;
            }
        }
    }

    // 3. Mostrando resultado
    if (macEncontrada) {
        resultadoDiv.innerHTML = `
            <div class="mac-info">
                <img src="${macEncontrada.imagen}" alt="${macEncontrada.modelo}">
                <h3>${macEncontrada.modelo}</h3>
                <p><strong>CPU:</strong> ${macEncontrada.cpu}</p>
                <p><strong>RAM:</strong> ${macEncontrada.ram}</p>
                <p><strong>Almacenamiento:</strong> ${macEncontrada.almacenamiento}</p>
                <p><strong>Part Number:</strong> ${macEncontrada.partNumber}</p>
            </div>
        `;
    } else {
        resultadoDiv.innerHTML = "<p class='error'>No se encontró ningún producto con ese dato.</p>";
    }
};

    
