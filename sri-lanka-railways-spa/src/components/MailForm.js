// src/components/MailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import MailMap from './MailMap';  // Import the map component
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Alert,
    Paper
} from '@mui/material';

const MailForm = () => {
    const [mailData, setMailData] = useState({
        name: '',
        train_id: '',
        destination: ''
    });
    const [mailId, setMailId] = useState(null);
    const [enteredMailId, setEnteredMailId] = useState('');
    const [mailLocation, setMailLocation] = useState(null);
    const [error, setError] = useState('');

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
        setError('');
        try {
            const response = await axios.post('http://localhost:3001/api/v1/mails', mailData);
            setMailId(response.data.data.mail_id);
        } catch (error) {
            console.error('Error submitting mail data:', error);
            setError('Failed to submit mail data. Please try again.');
        }
    };

    const handleMailIdSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/mails/${enteredMailId}`);
            setMailLocation(response.data.trainLocation);
        } catch (error) {
            console.error('Error fetching mail location:', error);
            setError('Failed to fetch mail location. Please check the Mail ID.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Enter Mail Details
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={mailData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Train ID"
                        variant="outlined"
                        name="train_id"
                        value={mailData.train_id}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Destination"
                        variant="outlined"
                        name="destination"
                        value={mailData.destination}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth type="submit">
                            Submit
                        </Button>
                    </Box>
                </Box>

                {mailId && (
                    <Box mt={4}>
                        <Typography variant="h6" align="center">
                            Your Mail ID is: {mailId}
                        </Typography>
                        <Typography align="center">
                            You can use this ID to track the mail's location.
                        </Typography>
                    </Box>
                )}

                {mailId && (
                    <Box mt={4} component="form" onSubmit={handleMailIdSubmit} noValidate autoComplete="off">
                        <Typography variant="h6" align="center" gutterBottom>
                            Track Mail Location
                        </Typography>
                        <TextField
                            fullWidth
                            label="Enter Mail ID"
                            variant="outlined"
                            value={enteredMailId}
                            onChange={handleMailIdChange}
                            margin="normal"
                            required
                        />
                        <Box mt={2}>
                            <Button variant="contained" color="secondary" fullWidth type="submit">
                                Track Mail
                            </Button>
                        </Box>
                    </Box>
                )}

                {error && (
                    <Box mt={2}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}
            </Paper>

            {mailLocation && (
                <Box mt={4}>
                    <MailMap location={mailLocation} />
                </Box>
            )}
        </Container>
    );
};

export default MailForm;
