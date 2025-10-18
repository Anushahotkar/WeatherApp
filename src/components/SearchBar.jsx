/*SearchBar.jsx*/


import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col rounded-2xl bg-gray-200 sm:flex-row gap-4 w-full max-w-2xl mx-auto"
    >
      <div className="flex-grow relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400 text-xl">🌍</span>
        </div>
        <input
          type="text"
          placeholder="Enter city name (e.g., London, Tokyo, New York)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !city.trim()}
        className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:from-indigo-700 hover:to-purple-700 shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Searching...</span>
          </>
        ) : (
          <>
            <span>🔍</span>
            <span>Check Weather</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SearchBar;