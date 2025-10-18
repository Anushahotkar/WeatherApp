/* App.jsx - Improved Visuals */

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Toast from './components/Toast';
import { WeatherService } from './api/weatherApi';

const App = () => {
  const year=new Date().getFullYear();
  const [weatherData, setWeatherData] = useState(null);
  const [citySearch, setCitySearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setWeatherData(null);
    setCitySearch(city);

    try {
      // Step 1: Geocode city name
      showToast(`Searching for "${city}"...`, 'info');
      const location = await WeatherService.geocodeCity(city);
      
      // Step 2: Get weather data
      showToast(`Getting weather for ${location.name}...`, 'info');
      const weather = await WeatherService.getWeatherForecast(
        location.latitude, 
        location.longitude
      );

      const cityNameDisplay = `${location.name}, ${location.country}`;
      setCitySearch(cityNameDisplay);
      setWeatherData(weather);
      
      showToast(`Weather data for ${location.name} loaded successfully!`, 'success');
      
    } catch (err) {
      console.error('Weather fetch error:', err);
      showToast(err.message, 'error');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 p-4 flex flex-col items-center">
      
      {/* --- Animated Background Elements --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Soft, glowing spheres */}
        <div className="absolute -top-60 -right-80 w-[40rem] h-[40rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-60 -left-80 w-[50rem] h-[50rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
      </div>

      {/* --- Header --- */}
      <header className="relative z-10 py-12 w-full max-w-6xl text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-7xl shadow-lg">☁️</span>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-teal-500 via-sky-600 to-indigo-700 bg-clip-text text-transparent tracking-tighter drop-shadow-lg">
              WeatherFlow
            </h1>
            <span className="text-7xl shadow-lg">☀️</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 font-light max-w-3xl leading-snug mt-2">
            Your real-time forecast solution. "Search any city worldwide" and see the magic happen.
          </p>
        </div>
      </header>

      {/* --- Search Section --- */}
      <section className="relative z-10 w-full max-w-3xl mb-12">
        {/* Note: Assuming SearchBar.jsx has modern, integrated styling */}
        <SearchBar onSearch={fetchWeather} loading={loading} />
      </section>

      {/* --- Main Content --- */}
      <main className="relative z-10 w-full max-w-6xl flex-1 pb-16">
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <div className="inline-flex flex-col items-center space-y-5 bg-white p-10 rounded-3xl shadow-2xl border border-blue-100/50">
              <div className="w-12 h-12 border-6 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-2xl font-semibold text-gray-700">
                Warming up the clouds for <span className="text-sky-600 font-bold">"{citySearch}"</span>...
              </p>
              <p className="text-sm text-gray-500">
                Fetching data from global weather satellites.
              </p>
            </div>
          </div>
        )}

        {/* Weather Card Display */}
        {weatherData && (
          <div className="animate-fade-in">
            {/* WeatherCard is assumed to have its own beautiful styling */}
            <WeatherCard data={weatherData} city={citySearch} />
          </div>
        )}

        {/* Initial Empty State */}
        {!loading && !weatherData && (
          <div className="text-center py-20">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-16 max-w-2xl mx-auto shadow-2xl border border-gray-200">
              <div className="text-8xl mb-6 transform hover:scale-105 transition-transform">🔍</div>
              <h3 className="text-4xl font-extrabold text-gray-800 mb-4 bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                Start Your Weather Journey
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Type a city name into the search bar above to instantly receive "accurate, real-time" weather conditions.
              </p>
              <div className="grid grid-cols-3 gap-6 text-sm text-gray-600 font-medium">
                <div className="flex flex-col items-center p-3 bg-blue-50 rounded-xl shadow-inner">
                  <span className="text-2xl mb-1">🌍</span>
                  <span>Global Coverage</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-green-50 rounded-xl shadow-inner">
                  <span className="text-2xl mb-1">⏱️</span>
                  <span>Real-Time Updates</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-purple-50 rounded-xl shadow-inner">
                  <span className="text-2xl mb-1">🖼️</span>
                  <span>Visualized Data</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
       
      {/* --- Footer --- */}
      <footer className="relative z-10 mt-20 pb-4 text-center text-gray-500 text-sm border-t border-gray-200 pt-4 w-full max-w-6xl">
        <p>© Anusha Hotkar {year} WeatherFlow. Data provided by Open-Meteo.</p>
      </footer>

      {/* --- Toast Notification --- */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;