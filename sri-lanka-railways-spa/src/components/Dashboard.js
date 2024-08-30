// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [trainId, setTrainId] = useState('');
    const [date, setDate] = useState(''); // State for the date input
    const navigate = useNavigate();

    const handleSearchTrain = () => {
        if (trainId) {
            navigate(`/trains/${trainId}`);
        }
    };

    const handleGetTrainByDate = () => {
        if (trainId && date) {
            navigate(`/trains/${trainId}/details?date=${date}`); // Assuming this route handles train data based on the date
        }
    };

    const handleGetAllTrains = () => {
        navigate('/trains');
    };

    const handleGetTrainHistory = () => {
        if (trainId) {
            navigate(`/trains/${trainId}/history`);
        }
    };

    const handleJourneyTime = () => {
        navigate('/journey-time');
    };

    const handleCheckMails = () => {
        navigate('/mails');
    };

    return (
        <div>
            <h1>Train Tracking Dashboard</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Train ID"
                    value={trainId}
                    onChange={(e) => setTrainId(e.target.value)}
                />
                <button onClick={handleSearchTrain}>Search Train Location</button>
                <button onClick={handleGetTrainHistory}>Get Train History</button>
            </div>
            <div>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={handleGetTrainByDate}>Get Specific Train</button>
            </div>
            <div>
                <button onClick={handleGetAllTrains}>Get All Trains</button>
                <button onClick={handleJourneyTime}>Get Journey Time</button>
                <button onClick={handleCheckMails}>Check Mails</button>
            </div>
        </div>
    );
};

export default Dashboard;
