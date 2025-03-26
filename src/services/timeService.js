// src/services/timeService.js

/**
 * Calculates time remaining until target date
 * @param {Date|string} targetDate - The target date to count down to
 * @returns {Object} Time remaining with days, hours, minutes, seconds
 */
export const calculateTimeRemaining = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const difference = target - now;

  if (difference <= 0) {
    return { 
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
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
    expired: false,
    totalSeconds: Math.floor(difference / 1000)
  };
};

/**
 * Formats date and time strings into a Date object
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @param {string} timeStr - Time string in HH:MM format
 * @returns {Date} Combined Date object
 */
export const formatDateTime = (dateStr, timeStr) => {
  const [year, month, day] = dateStr.split('-');
  const [hours, minutes] = timeStr.split(':');
  
  return new Date(year, month - 1, day, hours, minutes);
};

/**
 * Gets the next upcoming Nakath event
 * @param {Array} nakathList - Array of Nakath events
 * @returns {Object|null} Next upcoming Nakath or null if all passed
 */
export const getNextNakath = (nakathList) => {
  const now = Date.now();
  const upcoming = nakathList.filter(n => {
    const eventTime = new Date(`${n.date}T${n.time}:00`).getTime();
    return eventTime > now;
  });

  if (upcoming.length === 0) return null;

  return upcoming.reduce((closest, current) => {
    const currentTime = new Date(`${current.date}T${current.time}:00`).getTime();
    const closestTime = new Date(`${closest.date}T${closest.time}:00`).getTime();
    return (currentTime < closestTime) ? current : closest;
  });
};

/**
 * Checks if current time is within a Nakath period
 * @param {Object} nakath - Nakath event object
 * @param {number} [tolerance=60000] - Time window in milliseconds (default 1 minute)
 * @returns {boolean} True if current time is within the Nakath period
 */
export const isNakathTime = (nakath, tolerance = 60000) => {
  const now = new Date();
  const nakathTime = new Date(`${nakath.date}T${nakath.time}:00`);
  return Math.abs(now - nakathTime) < tolerance;
};

/**
 * Formats time remaining into a human-readable string
 * @param {Object} timeObj - Time object from calculateTimeRemaining
 * @returns {string} Formatted time string
 */
export const formatTimeRemaining = (timeObj) => {
  if (timeObj.expired) return 'Nakath time has arrived!';
  
  const parts = [];
  if (timeObj.days > 0) parts.push(`${timeObj.days} days`);
  if (timeObj.hours > 0) parts.push(`${timeObj.hours} hours`);
  if (timeObj.minutes > 0) parts.push(`${timeObj.minutes} minutes`);
  parts.push(`${timeObj.seconds} seconds`);
  
  return parts.join(', ');
};

/**
 * Gets all upcoming Nakath events in chronological order
 * @param {Array} nakathList - Array of Nakath events
 * @returns {Array} Sorted array of upcoming Nakath events
 */
export const getUpcomingNakaths = (nakathList) => {
  const now = Date.now();
  return nakathList
    .filter(n => new Date(`${n.date}T${n.time}:00`).getTime() > now)
    .sort((a, b) => {
      const aTime = new Date(`${a.date}T${a.time}:00`).getTime();
      const bTime = new Date(`${b.date}T${b.time}:00`).getTime();
      return aTime - bTime;
    });
};