/* WeatherCard.jsx - Enhanced Visuals */

import React from 'react';

// WMO Weather Code to Icon/Description/Color mapping (Same as original)
const getWeatherIcon = (code, isDay = 1) => {
  const weatherIcons = {
    0: { icon: isDay ? '☀️' : '🌙', description: 'Clear sky', color: 'text-yellow-500' },
    1: { icon: isDay ? '🌤️' : '🌙', description: 'Mainly clear', color: 'text-blue-400' },
    2: { icon: isDay ? '⛅' : '☁️', description: 'Partly cloudy', color: 'text-blue-300' },
    3: { icon: '☁️', description: 'Overcast', color: 'text-gray-400' },
    45: { icon: '🌫️', description: 'Fog', color: 'text-gray-300' },
    48: { icon: '🌫️', description: 'Depositing rime fog', color: 'text-gray-300' },
    51: { icon: '🌦️', description: 'Light drizzle', color: 'text-blue-200' },
    53: { icon: '🌦️', description: 'Moderate drizzle', color: 'text-blue-300' },
    55: { icon: '🌧️', description: 'Dense drizzle', color: 'text-blue-400' },
    61: { icon: '🌦️', description: 'Slight rain', color: 'text-blue-300' },
    63: { icon: '🌧️', description: 'Moderate rain', color: 'text-blue-400' },
    65: { icon: '💧', description: 'Heavy rain', color: 'text-blue-500' },
    80: { icon: '🌧️', description: 'Slight rain showers', color: 'text-blue-400' },
    81: { icon: '💧', description: 'Moderate rain showers', color: 'text-blue-500' },
    82: { icon: '☔', description: 'Violent rain showers', color: 'text-blue-600' },
    71: { icon: '❄️', description: 'Slight snow', color: 'text-blue-100' },
    73: { icon: '🌨️', description: 'Moderate snow', color: 'text-blue-200' },
    75: { icon: '☃️', description: 'Heavy snow', color: 'text-blue-300' },
    85: { icon: '🌨️', description: 'Slight snow showers', color: 'text-blue-200' },
    86: { icon: '☃️', description: 'Heavy snow showers', color: 'text-blue-300' },
    95: { icon: '⛈️', description: 'Thunderstorm', color: 'text-purple-500' },
    96: { icon: '🌩️', description: 'Thunderstorm with hail', color: 'text-purple-600' },
    99: { icon: '⚡', description: 'Heavy thunderstorm with hail', color: 'text-purple-700' }
  };
  
  return weatherIcons[code] || { icon: '🌈', description: 'Unknown', color: 'text-gray-400' };
};

const WeatherCard = ({ data, city }) => {
  if (!data) return null;

  const { current, timezone } = data;
  const { icon, description, color } = getWeatherIcon(current.weather_code, current.is_day);

  // Define stats array (Same as original)
  const stats = [
    { label: 'Feels Like', value: `${Math.round(current.apparent_temperature)}°C`, icon: '🌡️' },
    { label: 'Humidity', value: `${current.relative_humidity_2m}%`, icon: '💧' },
    { label: 'Wind Speed', value: `${current.wind_speed_10m} km/h`, icon: '💨' },
    { label: 'Pressure', value: `${current.surface_pressure} hPa`, icon: '🌡️' },
    { label: 'Visibility', value: `${current.visibility / 1000} km`, icon: '👁️' },
    { label: 'Precipitation', value: `${current.precipitation || 0} mm`, icon: '🌧️' }
  ];

  return (
    // Card Container: Enhanced Glass-Morphism and Shadow
    <div className="
      bg-white/80 backdrop-blur-md p-10 mt-10 rounded-3xl shadow-2xl 
      w-full max-w-3xl mx-auto transform transition-all duration-700 
      hover:shadow-3xl hover:scale-[1.02] border border-white/50 animate-fade-in
    ">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="
          text-5xl font-extrabold tracking-tight 
          bg-gradient-to-r from-sky-600 to-indigo-700 bg-clip-text text-transparent
        ">
          {city}
        </h2>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          📍 {timezone.replace(/_/g, ' ')}
        </p>
      </div>

      {/* Main Weather Info */}
      <div className="flex flex-col lg:flex-row items-center justify-between border-b border-gray-200 pb-8 mb-8">
        
        {/* Icon and Description */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <span className={`text-9xl ${color} filter drop-shadow-xl animate-bounce-slow`}>
            {icon}
          </span>
          <p className="text-3xl font-semibold text-gray-700 text-center lg:text-left">
            {description}
          </p>
        </div>
        
        {/* Temperature */}
        <div className="text-center lg:text-right mt-8 lg:mt-0">
          <p className="
            text-8xl font-black 
            bg-gradient-to-r from-sky-600 to-indigo-700 bg-clip-text text-transparent 
            leading-none drop-shadow-lg
          ">
            {Math.round(current.temperature_2m)}°C
          </p>
          <p className="text-lg text-gray-600 mt-3 font-medium">
            Real Feel: <span className="font-bold">{Math.round(current.apparent_temperature)}°C</span>
          </p>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="
              bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 
              transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl
            "
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Last Updated */}
      <div className="text-center mt-8 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          <span className="text-base mr-1">🔄</span> Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;