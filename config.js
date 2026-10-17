// ==========================================
// CONFIGURATION & SECURE LOCAL STORAGE
// ==========================================

// Retrieve saved API key from browser storage
function getStoredApiKey() {
    return localStorage.getItem('spydern_api_key') || "";
}

function saveApiKey(key) {
    localStorage.setItem('spydern_api_key', key.trim());
}
