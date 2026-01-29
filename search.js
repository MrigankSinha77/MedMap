
// Import the database instance from our firebase.js module
import { db } from './firebase.js';
// Import necessary functions from the Firestore SDK
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --- DOM Element References ---
// Get references to the interactive elements in our HTML.
const searchInput = document.getElementById('medicine-search');
const searchBtn = document.getElementById('search-btn');
const pharmacyList = document.getElementById('pharmacy-ul');
const noResultsMsg = document.getElementById('no-results');
const mapContainer = document.getElementById('map');

// --- Map Initialization ---
// Initialize the Leaflet map and set its initial view.
// Centered on a default location, which will be updated if the user provides their location.
const map = L.map(mapContainer).setView([26.4525, 87.2718], 13);
const mapMarkers = []; // Array to keep track of markers for easy removal

// Add the OpenStreetMap tile layer to the map.
// This provides the visual map background.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// --- Geolocation ---
// Try to get the user's current location.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Center the map on the user's location.
        map.setView([userLat, userLng], 14);

        // Add a marker to show the user's location.
        L.marker([userLat, userLng])
            .addTo(map)
            .bindPopup("<b>You are here!</b>")
            .openPopup();
    }, () => {
        console.warn("Geolocation permission denied. Map will remain at default center.");
    });
}

// --- Search Functionality ---
// Add a click event listener to the search button.
searchBtn.addEventListener('click', performSearch);
// Allow pressing Enter to trigger a search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});


async function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Validate input
    if (!searchTerm) {
        alert("Please enter a medicine name to search.");
        return;
    }

    clearResults(); // Clear previous results before starting a new search

    try {
        // Fetch all documents from the "pharmacies" collection in Firestore.
        const querySnapshot = await getDocs(collection(db, "pharmacies"));
        const matchingPharmacies = [];

        querySnapshot.forEach(doc => {
            const pharmacy = doc.data();
            const medicines = pharmacy.medicines.map(m => m.toLowerCase()); // Case-insensitive search

            if (medicines.includes(searchTerm)) {
                matchingPharmacies.push({ id: doc.id, ...pharmacy });
            }
        });

        if (matchingPharmacies.length > 0) {
            displayResults(matchingPharmacies);
            noResultsMsg.classList.add('hidden');
            pharmacyList.parentElement.classList.remove('hidden');
        } else {
            noResultsMsg.classList.remove('hidden');
        }

    } catch (error) {
        console.error("Error fetching pharmacies:", error);
        alert("Failed to fetch pharmacy data. Please check your connection and Firebase setup.");
    }
}

// --- UI Display Functions ---

function displayResults(pharmacies) {
    pharmacies.forEach(pharmacy => {
        // Add to list
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${pharmacy.name}</strong>
            <p>${pharmacy.address}</p>
            <p>Status: <span class="${pharmacy.open ? 'open' : 'closed'}">${pharmacy.open ? 'Open' : 'Closed'}</span></p>
        `;
        pharmacyList.appendChild(listItem);

        // Add marker to map
        if (pharmacy.lat && pharmacy.lng) {
            const marker = L.marker([pharmacy.lat, pharmacy.lng])
                .addTo(map)
                .bindPopup(`<b>${pharmacy.name}</b><br>${pharmacy.address}`);
            mapMarkers.push(marker);
        }
    });

     // Adjust map view to fit all markers
    if (mapMarkers.length > 0) {
        const group = new L.featureGroup(mapMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

function clearResults() {
    // Clear list
    pharmacyList.innerHTML = '';
    // Clear map markers
    mapMarkers.forEach(marker => map.removeLayer(marker));
    mapMarkers.length = 0; // Empty the array
    // Hide messages
    pharmacyList.parentElement.classList.add('hidden');
    noResultsMsg.classList.add('hidden');
}
