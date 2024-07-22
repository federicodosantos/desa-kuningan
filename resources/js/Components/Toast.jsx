import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000, autoHide = true }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;
    let interval;

    if (autoHide) {
      timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);

      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress > 0) {
            return prevProgress - (100 / (duration / 100));
          }
          return 0;
        });
      }, 100);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [onClose, duration, autoHide]);

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
    <div className={`fixed bottom-4 lg:right-4 right-2 z-50 px-4 py-2 rounded-md text-white text-xs lg:text-xl font-semibold ${getBackgroundColor()} shadow-lg`}>
      <div className="flex items-center">
        <span>{message}</span>
        <button onClick={() => {
          setIsVisible(false);
          onClose();
        }} className="ml-2 text-white focus:outline-none">
          &times;
        </button>
      </div>
      {autoHide && (
        <div className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-50 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
      )}
    </div>
  );
};

export default Toast;
