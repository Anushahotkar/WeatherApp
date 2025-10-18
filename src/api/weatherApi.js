/*WeatherApi.js*/

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search?';
const FORECAST_API = 'https://api.open-meteo.com/v1/forecast?';

export class WeatherService {
  static async geocodeCity(city) {
    try {
      const geoUrl = `${GEOCODING_API}name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
      const response = await fetch(geoUrl);
      
      if (!response.ok) throw new Error('Geocoding service unavailable');
      
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error(`"${city}" not found. Try another city name.`);
      }
      
      return data.results[0];
    } catch (error) {
      if (error.message.includes('not found')) throw error;
      throw new Error('Location service temporarily unavailable');
    }
  }

  static async getWeatherForecast(latitude, longitude) {
    try {
      const weatherVars = [
        'temperature_2m', 'apparent_temperature', 'weather_code', 
        'wind_speed_10m', 'relative_humidity_2m', 'surface_pressure',
        'is_day', 'precipitation', 'visibility'
      ].join(',');
      
      const weatherUrl = `${FORECAST_API}latitude=${latitude}&longitude=${longitude}&current=${weatherVars}&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`;
      
      const response = await fetch(weatherUrl);
      
      if (!response.ok) throw new Error('Weather service unavailable');
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.reason || 'Failed to fetch weather data');
      }
      
      return data;
    } catch (error) {
      if (error.message.includes('Weather service')) throw error;
      throw new Error('Weather data temporarily unavailable');
    }
  }
}