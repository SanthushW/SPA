// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TrainMap from './components/TrainMap';
import TrainDetails from './components/TrainDetails';
import TrainHistory from './components/TrainHistory';
import AllTrains from './components/AllTrains';
import JourneyTime from './components/JourneyTime';
import MailForm from './components/MailForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trains/:train_id" element={<TrainMap />} />
                <Route path="/trains/:train_id/details" element={<TrainDetails />} />
                <Route path="/trains/:train_id/history" element={<TrainHistory />} />
                <Route path="/trains" element={<AllTrains />} />
                <Route path="/journey-time" element={<JourneyTime />} />
                <Route path="/mails" element={<MailForm />} />
            </Routes>
        </Router>
    );
};

export default App;
