// app.js

// Create a map using Leaflet.js
const map = L.map('map').setView([0, 0], 1); // Default location: World view

// Add a tile layer (you can choose any other tile provider)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Initialize an empty array to store user markers
const userMarkers = [];

// Function to add a user marker
function addUserMarker(lat, lng, nickname) {
    const marker = L.circleMarker([lat, lng], { radius: 5, color: '#0074D9' }).addTo(map);
    userMarkers.push(marker);

    // Add nickname as a tooltip
    marker.bindTooltip(nickname, { permanent: true, direction: 'top', className: 'user-nickname' });
}

// Simulate user connections (you can replace this with actual WebRTC logic)
addUserMarker(0, 0, 'Tiger_123'); // User 1
addUserMarker(10, 20, 'Elephant_456'); // User 2
addUserMarker(-30, 15, 'Giraffe_789'); // User 3

// You can add more users by calling addUserMarker(lat, lng, nickname) with their coordinates and nicknames

// Center the map on the average location of all users
if (userMarkers.length > 0) {
    const bounds = L.latLngBounds(userMarkers.map(marker => marker.getLatLng()));
    map.fitBounds(bounds);
}
