// src/components/MailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import MailMap from './MailMap';  // Import a new component to display the map

const MailForm = () => {
    const [mailData, setMailData] = useState({
        name: '',         // Add a name field
        train_id: '',
        destination: ''
    });
    const [mailId, setMailId] = useState(null);
    const [enteredMailId, setEnteredMailId] = useState('');  // State to hold the entered mail_id
    const [mailLocation, setMailLocation] = useState(null);  // State to hold the location data

    const handleChange = (e) => {
        setMailData({
            ...mailData,
            [e.target.name]: e.target.value
        });
    };

    const handleMailIdChange = (e) => {
        setEnteredMailId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/mails', mailData);
            setMailId(response.data.data.mail_id);  // Extract and set the mail_id from the response
        } catch (error) {
            console.error('Error submitting mail data:', error);
        }
    };

    const handleMailIdSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/mails/${enteredMailId}`);
            setMailLocation(response.data.trainLocation);  // Extract and set the location data
        } catch (error) {
            console.error('Error fetching mail location:', error);
        }
    };

    return (
        <div>
            <h2>Enter Mail Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={mailData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Train ID:</label>
                    <input
                        type="text"
                        name="train_id"
                        value={mailData.train_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        value={mailData.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {mailId && (
                <div>
                    <h3>Your Mail ID is: {mailId}</h3>
                    <p>You can use this ID to track the mail's location.</p>
                </div>
            )}

            {mailId && (
                <div>
                    <h2>Track Mail Location</h2>
                    <form onSubmit={handleMailIdSubmit}>
                        <input
                            type="text"
                            placeholder="Enter Mail ID"
                            value={enteredMailId}
                            onChange={handleMailIdChange}
                            required
                        />
                        <button type="submit">Track Mail</button>
                    </form>
                </div>
            )}

            {mailLocation && (
                <MailMap location={mailLocation} />
            )}
        </div>
    );
};

export default MailForm;
