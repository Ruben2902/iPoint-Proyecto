// Inventory Management System - JavaScript
// This file contains all the interactive functionality for the iPoint Inventory System
// Perfect for learning JavaScript concepts!

// ========== GLOBAL VARIABLES ==========
// These variables store our application data and can be accessed anywhere

let inventory = []; // Array to store all inventory items
let nextId = 1;     // Counter to give each item a unique ID number

// ========== DOM ELEMENTS ==========
// These variables store references to HTML elements we need to interact with
// DOM = Document Object Model (the webpage structure)
const addItemForm = document.getElementById('add-item-form');
const inventoryList = document.getElementById('inventory-list');
const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');
const totalItemsSpan = document.getElementById('total-items');
const totalValueSpan = document.getElementById('total-value');
const totalCategoriesSpan = document.getElementById('total-categories');

// ========== APPLICATION STARTUP ==========
// This code runs when the webpage finishes loading
document.addEventListener('DOMContentLoaded', function() {
    loadInventoryFromStorage();
    updateStats();
    displayInventory();
    
    // Add event listeners
    addItemForm.addEventListener('submit', handleAddItem);
    searchInput.addEventListener('input', handleSearch);
    filterCategory.addEventListener('change', handleFilter);
});

// Item class/constructor
class InventoryItem {
    constructor(name, category, quantity, price) {
        this.id = nextId++;
        this.name = name.trim();
        this.category = category;
        this.quantity = parseInt(quantity);
        this.price = parseFloat(price);
        this.dateAdded = new Date().toLocaleDateString();
    }
    
    getTotalValue() {
        return this.quantity * this.price;
    }
}

// Handle form submission
function handleAddItem(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(addItemForm);
    const name = formData.get('itemName');
    const category = formData.get('category');
    const quantity = formData.get('quantity');
    const price = formData.get('price');
    
    // Validate input
    if (!validateInput(name, category, quantity, price)) {
        return;
    }
    
    // Create new item
    const newItem = new InventoryItem(name, category, quantity, price);
    
    // Add to inventory
    inventory.push(newItem);
    
    // Save to localStorage
    saveInventoryToStorage();
    
    // Update display
    displayInventory();
    updateStats();
    
    // Reset form and show success message
    addItemForm.reset();
    showSuccessMessage('Item added successfully!');
}

// Validate form input
function validateInput(name, category, quantity, price) {
    if (!name || name.trim().length === 0) {
        alert('Please enter a valid item name.');
        return false;
    }
    
    if (!category) {
        alert('Please select a category.');
        return false;
    }
    
    if (quantity < 0 || isNaN(quantity)) {
        alert('Please enter a valid quantity (0 or more).');
        return false;
    }
    
    if (price < 0 || isNaN(price)) {
        alert('Please enter a valid price (0 or more).');
        return false;
    }
    
    // Check for duplicate items
    const existingItem = inventory.find(item => 
        item.name.toLowerCase() === name.trim().toLowerCase() && 
        item.category === category
    );
    
    if (existingItem) {
        const updateQuantity = confirm(
            `An item "${name}" in category "${category}" already exists. Do you want to update its quantity instead?`
        );
        
        if (updateQuantity) {
            existingItem.quantity += parseInt(quantity);
            existingItem.price = parseFloat(price); // Update price to latest
            saveInventoryToStorage();
            displayInventory();
            updateStats();
            addItemForm.reset();
            showSuccessMessage('Item quantity updated successfully!');
        }
        return false;
    }
    
    return true;
}

// Display inventory items
function displayInventory(itemsToShow = null) {
    const items = itemsToShow || inventory;
    
    if (items.length === 0) {
        inventoryList.innerHTML = '<p class="empty-inventory">No items found. Try adjusting your search or add some items!</p>';
        return;
    }
    
    inventoryList.innerHTML = items.map(item => `
        <div class="inventory-item" data-id="${item.id}">
            <div class="item-name">${escapeHtml(item.name)}</div>
            <div class="item-category">${item.category}</div>
            <div class="item-quantity">${item.quantity} units</div>
            <div class="item-price">$${item.price.toFixed(2)}</div>
            <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
        </div>
    `).join('');
}

// Delete item
function deleteItem(id) {
    const itemIndex = inventory.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        const item = inventory[itemIndex];
        const confirmDelete = confirm(`Are you sure you want to delete "${item.name}"?`);
        
        if (confirmDelete) {
            inventory.splice(itemIndex, 1);
            saveInventoryToStorage();
            displayInventory();
            updateStats();
            showSuccessMessage('Item deleted successfully!');
        }
    }
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    
    // Apply category filter if active
    const categoryFilter = filterCategory.value;
    const finalItems = categoryFilter 
        ? filteredItems.filter(item => item.category === categoryFilter)
        : filteredItems;
    
    displayInventory(finalItems);
}

// Handle category filter
function handleFilter() {
    handleSearch(); // Reuse search logic which now includes category filtering
}

// Update statistics
function updateStats() {
    const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = inventory.reduce((sum, item) => sum + item.getTotalValue(), 0);
    const categories = new Set(inventory.map(item => item.category));
    
    totalItemsSpan.textContent = totalItems;
    totalValueSpan.textContent = `$${totalValue.toFixed(2)}`;
    totalCategoriesSpan.textContent = categories.size;
}

// Save to localStorage
function saveInventoryToStorage() {
    try {
        localStorage.setItem('ipoint-inventory', JSON.stringify(inventory));
        localStorage.setItem('ipoint-next-id', nextId.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Warning: Your data could not be saved locally.');
    }
}

// Load from localStorage
function loadInventoryFromStorage() {
    try {
        const savedInventory = localStorage.getItem('ipoint-inventory');
        const savedNextId = localStorage.getItem('ipoint-next-id');
        
        if (savedInventory) {
            inventory = JSON.parse(savedInventory);
        }
        
        if (savedNextId) {
            nextId = parseInt(savedNextId);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        inventory = [];
        nextId = 1;
    }
}

// Show success message
function showSuccessMessage(message) {
    // Remove existing success messages
    const existingMessages = document.querySelectorAll('.success-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create and show new message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    
    // Insert before the form
    const addItemSection = document.querySelector('.add-item-section');
    addItemSection.insertBefore(messageDiv, addItemForm);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Export data (bonus feature)
function exportInventory() {
    if (inventory.length === 0) {
        alert('No data to export!');
        return;
    }
    
    const dataStr = JSON.stringify(inventory, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ipoint-inventory-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Import data (bonus feature)
function importInventory(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (Array.isArray(importedData)) {
                const confirmImport = confirm(
                    `This will replace your current inventory with ${importedData.length} items. Continue?`
                );
                
                if (confirmImport) {
                    inventory = importedData;
                    nextId = Math.max(...inventory.map(item => item.id), 0) + 1;
                    saveInventoryToStorage();
                    displayInventory();
                    updateStats();
                    showSuccessMessage('Inventory imported successfully!');
                }
            } else {
                alert('Invalid file format. Please select a valid JSON file.');
            }
        } catch (error) {
            alert('Error reading file. Please make sure it\'s a valid JSON file.');
        }
    };
    reader.readAsText(file);
}

// Clear all data (with confirmation)
function clearAllData() {
    const confirmClear = confirm(
        'Are you sure you want to delete ALL inventory data? This action cannot be undone!'
    );
    
    if (confirmClear) {
        const doubleConfirm = confirm('This will permanently delete all your data. Are you absolutely sure?');
        
        if (doubleConfirm) {
            inventory = [];
            nextId = 1;
            localStorage.removeItem('ipoint-inventory');
            localStorage.removeItem('ipoint-next-id');
            displayInventory();
            updateStats();
            showSuccessMessage('All data cleared successfully!');
        }
    }
}

// Console commands for developers
console.log('%ciPoint Inventory System', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('Available commands:');
console.log('- exportInventory(): Export current inventory as JSON');
console.log('- clearAllData(): Clear all inventory data');
console.log('- inventory: View current inventory array');
console.log('- updateStats(): Refresh statistics display');

// Make some functions available globally for console use
window.exportInventory = exportInventory;
window.clearAllData = clearAllData;
window.inventory = inventory;