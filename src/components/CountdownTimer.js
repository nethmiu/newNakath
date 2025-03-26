// src/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    if (difference <= 0) {
      return { expired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      expired: false
    };
  }

  if (timeLeft.expired) {
    return (
      <motion.div 
        className="text-center py-2 rounded"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        style={{
          background: 'rgba(0, 2, 1, 0.15)',
          color: '#27ae60'
        }}
      >
        <span className="sinhala-font fw-bold">
          නැකත් කාලය උදා වී ඇත...
        </span>
      </motion.div>
    );
  }

  return (
    <div className="countdown-timer">
      <div className="d-flex justify-content-between text-center">
        {[
          { value: timeLeft.days, label: 'දින' },
          { value: timeLeft.hours, label: 'පැය' },
          { value: timeLeft.minutes, label: 'මිනිත්තු' },
          { value: timeLeft.seconds, label: 'තත්පර' }
        ].map((item, index) => (
          <motion.div 
            key={index}
            className="countdown-item"
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          >
            <div className="countdown-value fw-bold" style={{ fontSize: '1.3rem' }}>
              {item.value}
            </div>
            <div className="countdown-label sinhala-font" style={{ fontSize: '0.75rem' }}>
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;