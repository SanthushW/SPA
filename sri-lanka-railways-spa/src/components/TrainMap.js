import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationIcon from './location-pin.png'; // Import your custom location pin icon
import axios from 'axios';  // Import axios for API calls

// Create a custom icon
const customIcon = new L.Icon({
    iconUrl: locationIcon, // Replace with your custom icon path
    iconSize: [38, 45], // Size of the icon
    iconAnchor: [22, 45], // Point of the icon which will correspond to marker's location
    popupAnchor: [-3, -45] // Point from which the popup should open relative to the iconAnchor
});

const TrainMap = () => {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        // Function to fetch real-time train data
        const fetchTrainData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/trains/locations');
                setTrains(response.data);
            } catch (error) {
                console.error('Error fetching train data:', error);
            }
        };

        // Fetch data immediately and set up an interval to fetch it periodically
        fetchTrainData();
        const intervalId = setInterval(fetchTrainData, 60000); // Fetch data every 60 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    return (
        <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: "100vh", width: "100vw" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={18}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {trains.map(train => (
                <Marker key={train.train_id} position={[train.latitude, train.longitude]} icon={customIcon}>
                    <Popup>
                        <strong>{train.train_name}</strong> <br />
                        Latitude: {train.latitude}, Longitude: {train.longitude} <br />
                        Speed: {train.speed} km/h <br />
                        Last updated: {new Date(train.timestamp).toLocaleTimeString()}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default TrainMap;
