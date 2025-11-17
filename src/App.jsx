import callApi from "./assets/callApi";
import styles from "./AppStyles.module.css";
import { Wind, Waves, Thermometer, SolarPanel, Search } from 'lucide-react';
import { useState } from 'react';

const INITIAL_CITY = "Krems an der Donau";

const App = () => {

  const [currentCity, setCurrentCity] = useState(INITIAL_CITY);

  const [newCityName, setNewCityName] = useState('');

  const { weatherData, error } = callApi(currentCity);

  const handleChange = (event) => {
    setNewCityName(event.target.value);
  };

  const handleClick = () => {
    if (newCityName.trim() !== '') {
      setCurrentCity(newCityName);
      setNewCityName('');
    }
  };

  if (error) {
    return (
    <div className={styles.weatherApp}>
      <h4>Sorry, the city is not available!</h4>
        <div className={styles.searchSection}>
          <input 
            id="searchCity" 
            name="searchCity" 
            className={styles.searchBar} 
            placeholder={currentCity} 
            value={newCityName} 
            onChange={handleChange}
          />
          
          <button 
            id="search" 
            className={styles.searchButton} 
            onClick={handleClick}>
            <Search />
          </button>

        </div>
    </div>
    );
  }

  if (!weatherData) {
      return (
        <div className={styles.weatherApp}>
          <h2 className={styles.loading}>Loading weather data for {currentCity}...</h2>
        </div>
      );
    }

  return (

    <div className={styles.weatherApp}>

      <div className={styles.searchSection}>
        <input 
          id="searchCity" 
          name="searchCity" 
          className={styles.searchBar} 
          placeholder={currentCity} 
          value={newCityName} 
          onChange={handleChange}
        />
        
        <button 
          id="search" 
          className={styles.searchButton} 
          onClick={handleClick}>
          <Search />
        </button>

      </div>


      <div className={styles.weatherData}>
        <div className={styles.weatherCity}>
          <img src={weatherData.current.condition.icon} alt="" />
          <h1>{weatherData.current.heatindex_c}°C</h1>
          <p>{weatherData.location.name} <br /> {weatherData.location.country}</p>
          <p>{weatherData.location.localtime}</p>
        </div>




        <div className={styles.weatherMisc}>
          <div className={styles.miscData}>
            <div>
              <Wind size={40}/>
              <h3>{weatherData.current.wind_kph}<br />km/h
              </h3>
            </div>
            <div>
              <Thermometer size={40}/>
              <h3>{weatherData.current.feelslike_c}<br />°C</h3>
            </div>
            <div>
              <Waves size={40}/>
              <h3>{weatherData.current.humidity}<br />%</h3>
            </div>
            <div>
              <SolarPanel size={40}/>
              <h3>{weatherData.current.uv}<br />UV</h3>
            </div>
          </div>



          <div className={styles.forecast}>
            <div>
              <p>{new Date(weatherData.forecast.forecastday[0].date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <img src={weatherData.forecast.forecastday[0].day.condition.icon} alt="" />
              <h3>{weatherData.forecast.forecastday[0].day.maxtemp_c}°C</h3>
              <p>{weatherData.forecast.forecastday[0].day.mintemp_c}°C</p>
            </div>
            <div>
              <p>{new Date(weatherData.forecast.forecastday[1].date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <img src={weatherData.forecast.forecastday[1].day.condition.icon} alt="" />
              <h3>{weatherData.forecast.forecastday[1].day.maxtemp_c}°C</h3>
              <p>{weatherData.forecast.forecastday[1].day.mintemp_c}°C</p>
            </div>
            <div>
              <p>{new Date(weatherData.forecast.forecastday[2].date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <img src={weatherData.forecast.forecastday[2].day.condition.icon} alt="" />
              <h3>{weatherData.forecast.forecastday[2].day.maxtemp_c}°C</h3>
              <p>{weatherData.forecast.forecastday[2].day.mintemp_c}°C</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}

export default App
