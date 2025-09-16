// Datos ficticios para pruebas
        const baseDatos = {
            "C02X12345678": { 
                modelo: "MacBook Pro 16-inch 2021", 
                cpu: "Apple M1 Pro", 
                ram: "16 GB", 
                almacenamiento: "512 GB",
                imagen: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-spacegray-select-202110?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1632788574000"
            },
            "C02Z98765432": { 
                modelo: "MacBook Pro 14-inch 2023", 
                cpu: "Apple M2 Pro", 
                ram: "32 GB", 
                almacenamiento: "1 TB",
                imagen: "https://ipoint.pe/wp-content/uploads/2024/09/SPBLCK.jpg"
            },
            "C02A11223344": { 
                modelo: "MacBook Pro 13-inch 2020", 
                cpu: "Intel i5", 
                ram: "8 GB", 
                almacenamiento: "256 GB",
                imagen: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp13touch-space-select-202011_GEO_EMEA_LANG_ES?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1603406905000"
            }
        };

        // Función para buscar un Mac
        const buscarMac = () => {
            const tipoBusqueda = document.querySelector('input[name="tipoBusqueda"]:checked').value;
            const dato = document.getElementById("datoInput").value.trim().toLowerCase();
            const resultadoDiv = document.getElementById("resultado");

            if (!dato) {
                resultadoDiv.innerHTML = "<p class='error'>Por favor ingresa un número de serie o nombre de modelo.</p>";
                return;
            }

            let macEncontrada = null;

            // Buscar por número de serie
            if (tipoBusqueda === "serial") {
                macEncontrada = baseDatos[dato.toUpperCase()] || null;
            } else {  // 2️⃣ Buscar por nombre de modelo
                for (let serial in baseDatos) {
                    if (baseDatos[serial][tipoBusqueda].toLowerCase() === dato) {
                        macEncontrada = baseDatos[serial];
                        break;
                    }
                }
            }

            if (macEncontrada) {
                resultadoDiv.innerHTML = `
                    <div class="mac-info">
                        <img src="${macEncontrada.imagen}" alt="${macEncontrada.modelo}">
                        <h3>${macEncontrada.modelo}</h3>
                        <p><strong>CPU:</strong> ${macEncontrada.cpu}</p>
                        <p><strong>RAM:</strong> ${macEncontrada.ram}</p>
                        <p><strong>Almacenamiento:</strong> ${macEncontrada.almacenamiento}</p>
                         <p><strong>Part Number:</strong> ${macEncontrada.partNumber}</p>
                    </div>`;
            } else {
                resultadoDiv.innerHTML = "<p class='error'>No se encontró ningún producto con ese dato.</p>";
            }
        }
    
