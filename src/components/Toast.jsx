/*Toast.jsx*/

import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[type];

  const icon = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  }[type];

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl max-w-sm transform transition-transform duration-300 ease-in-out z-50 flex items-center space-x-3 animate-slide-in`}>
      <span className="text-xl">{icon}</span>
      <p className="font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;