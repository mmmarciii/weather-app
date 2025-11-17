import { useEffect, useState } from "react";

const callApi = (city) => {

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const targetUrl = `/api/get-weather?city=${city}&days=3&aqi=no&alerts=no`;

    useEffect(()=>{

        setError(null); 
        setWeatherData(null);

        const fetchWeatherData = async() => {
        try {
            const url = targetUrl;

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

      fetchWeatherData();
    },[city]);

  return { weatherData, error };
}

export default callApi;