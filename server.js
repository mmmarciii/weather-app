import express from 'express';
import fetch from 'node-fetch'; // Requires node-fetch since Node.js older than v18 doesn't have native fetch
import cors from 'cors'

const app = express();
const PORT = 3001; // Use a different port than your Vite app (usually 5173)

const API_KEY = "2bc77f47cb684ec7b0a150156251611";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";


const corsOptions = {
    origin: 'https://mmyweatherapp.netlify.app/', // Only allow your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

// Define the new endpoint your React app will call
app.get('/api/get-weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City parameter is required." });
    }

    // Construct the full external API URL
    const targetUrl = `${BASE_URL}?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;
    try {
        // Server-to-server call (no CORS issues)
        const response = await fetch(targetUrl);
        const data = await response.json();
        
        // Forward the response (including data and status) back to the React client
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Error fetching data from weatherapi:", error);
        res.status(500).json({ error: "Failed to fetch weather data." });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
});