// src/components/TrainDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const TrainDetails = () => {
    const { train_id } = useParams();
    const location = useLocation(); // Hook to get query parameters
    const [train, setTrain] = useState(null);

    useEffect(() => {
        const fetchTrainDetails = async () => {
            try {
                const params = new URLSearchParams(location.search); // Get query params from the URL
                const date = params.get('date'); // Extract the 'date' query parameter
                
                const response = await axios.get(`http://localhost:3001/api/v1/trains/${train_id}/locations`, {
                    params: { date } // Pass the date as a query parameter to the backend
                });
                setTrain(response.data);
            } catch (error) {
                console.error('Error fetching train details:', error);
            }
        };

        fetchTrainDetails();
    }, [train_id, location.search]);

    if (!train) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{train.train_name}</h2>
            <p>Train ID: {train.train_id}</p>
            <p>Latitude: {train.latitude}</p>
            <p>Longitude: {train.longitude}</p>
            <p>Speed: {train.speed} km/h</p>
            <p>Signal Strength: {train.signal_strength}%</p>
            <p>Location: {train.locationName}</p>
            <p>Timestamp: {new Date(train.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default TrainDetails;
