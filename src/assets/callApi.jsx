import { useEffect, useState } from "react";

const API_KEY = "2bc77f47cb684ec7b0a150156251611";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

const callApi = (city) => {

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

    useEffect(()=>{

        setError(null); 
        setWeatherData(null);

        const fetchWeatherData = async() => {
        try {
            const url = `${BASE_URL}?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setWeatherData(data);
            } else {
                setError(new Error(data.error?.message || 'City not found.'));
            }

        } catch (error) {
                setError(new Error('Network error or API is down.'));
        }
        };

        if (city) {
            fetchWeatherData();
        }
  }, [city]);

  return { weatherData, error };
}

export default callApi;