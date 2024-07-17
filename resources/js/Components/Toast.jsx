import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress > 0) {
          return prevProgress - (100 / (duration / 100));
        }
        return 0;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose, duration]);

  if (!isVisible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-md text-text-white text-xl font-semibold ${getBackgroundColor()} shadow-lg`}>
      <div className="flex items-center">
        <span>{message}</span>
        <button onClick={() => setIsVisible(false)} className="ml-2 text-white focus:outline-none">
          &times;
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-50 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Toast;