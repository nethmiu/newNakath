// src/components/AutoPlayAudio.js
import React, { useEffect, useRef } from 'react';

const AutoPlayAudio = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt autoplay when component mounts
    const attemptAutoplay = async () => {
      try {
        await audioRef.current.play();
        console.log("Autoplay succeeded");
      } catch (err) {
        console.log("Autoplay blocked:", err);
        // Show play button if autoplay fails
        document.getElementById('playButton').style.display = 'block';
      }
    };

    // Add event listener for user interaction as fallback
    const handleUserInteraction = () => {
      audioRef.current.play()
        .then(() => {
          document.getElementById('playButton').style.display = 'none';
        })
        .catch(e => console.log("Play failed:", e));
      
      // Remove after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    attemptAutoplay();
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const handlePlayClick = () => {
    audioRef.current.play()
      .then(() => {
        document.getElementById('playButton').style.display = 'none';
      })
      .catch(e => console.log("Manual play failed:", e));
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 100 }}>
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        loop
        style={{ display: 'none' }}
      >
        <source src="/audio/newyear.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Fallback play button */}
      <button
        id="playButton"
        onClick={handlePlayClick}
        style={{
          display: 'none',
          backgroundColor: '#e67e22',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
        title="Play New Year Music"
      >
        <i className="bi bi-music-note-beamed"></i>
      </button>
    </div>
  );
};

export default AutoPlayAudio;