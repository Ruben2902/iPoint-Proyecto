const inventory = {
    products: [],
};
const form = document.getElementById('agregarProductoForm');
const tableBody = document.getElementById('tableBody');

// Función para agregar un nuevo producto a la tabla
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar los valores DENTRO del evento submit
    const id = document.getElementById('id').value;
    const category = document.getElementById('category').value;
    const serial = document.getElementById('serial').value;
    const productName = document.getElementById('productName').value;
    const partNumber = document.getElementById('partNumber').value;

    // Validar que todos los campos estén completos
    if(!id || !category || !serial || !productName || !partNumber) {
        alert('Complete todos los campos.');
        return;
    }

    // Agregar al inventario JSON
    const newProduct = {
        id,
        category,
        serial,
        productName,
        partNumber,
    };

    inventory.products.push(newProduct);
    console.log('Producto agregado:', newProduct);
    console.log('Inventario actual:', inventory.products);

    // Agregar fila a la tabla HTML
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${category.toUpperCase()}</td>
        <td>${serial.toUpperCase()}</td>
        <td>${productName.toUpperCase()}</td>
        <td>${partNumber.toUpperCase()}</td>
        <td><button class="eliminar-btn">Eliminar</button></td>
    `;
    tableBody.appendChild(newRow);

    // Limpiar el formulario
    form.reset();
});

tableBody.addEventListener('click', function(e) { //funcion para eliminar filas de la tabla
    if (e.target.classList.contains('eliminar-btn')) {
        const row = e.target.closest('tr');
        tableBody.removeChild(row);
    }
});


