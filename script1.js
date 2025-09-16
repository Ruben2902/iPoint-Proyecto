const form = document.getElementById('agregarProductoForm');
const tableBody = document.getElementById('tableBody');

// Función para agregar un nuevo producto a la tabla

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const serial = document.getElementById('serial').value;
    const name = document.getElementById('name').value;
    const partNumber = document.getElementById('partNumber').value;
    const id = tableBody.children.length + 1; // Generate a simple ID based on the number of rows

    // Alerta si los campos están vacíos
    if(!serial || !name || !partNumber) {
        alert('Complete todos los campos.');
        return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${serial.toUpperCase()}</td>
        <td>${name.toUpperCase()}</td>
        <td>${partNumber.toUpperCase()}</td>
        <td><button class="eliminar-btn">Eliminar</button></td>
    `;
    tableBody.appendChild(newRow);

    form.reset();
});

tableBody.addEventListener('click', function(e) { //funcion para eliminar filas de la tabla
    if (e.target.classList.contains('eliminar-btn')) {
        const row = e.target.closest('tr');
        tableBody.removeChild(row);
    }
});
