import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrainMap from './components/TrainMap';
import TrainDetails from './components/TrainDetails';
import TrainHistory from './components/TrainHistory';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TrainMap />} />
                <Route path="/trains/:train_id" element={<TrainDetails />} />
                <Route path="/trains/:train_id/history" element={<TrainHistory />} />
            </Routes>
        </Router>
    );
};

export default App;
