const getInventoryUrl = () => {
  if (typeof window !== 'undefined') {
    return new URL('/ipoint-proyecto/inventory', window.location.origin).toString();
  }
  // Fallback para ejecución en Node/Code Runner
  return process.env.INVENTORY_URL || 'http://localhost:3000/ipoint-proyecto/inventory';
};

const loadInventory = async () => {
  try {
    const url = getInventoryUrl();
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log('Inventario:', data);
  } catch (err) {
    console.error('No se pudo cargar el inventario:', err);
  }
};

loadInventory();
