// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import NakathCard from './components/NakathCard';
import nakathTimes2025 from './models/nakathData';
import AutoPlayAudio from './components/AutoPlayAudio';

import { getNextNakath, getUpcomingNakaths } from './services/timeService';
import NewYearDawnMessage from './components/NewYearDawnMessage';
import './App.css';

function App() {
  const [nextNakath, setNextNakath] = useState(null);
  const [upcomingNakaths, setUpcomingNakaths] = useState([]);

  useEffect(() => {
    // Initialize with current upcoming events
    const upcoming = getUpcomingNakaths(nakathTimes2025);
    setUpcomingNakaths(upcoming);
    setNextNakath(getNextNakath(upcoming));

    // Update every minute to handle time changes
    const interval = setInterval(() => {
      const updatedUpcoming = getUpcomingNakaths(nakathTimes2025);
      setUpcomingNakaths(updatedUpcoming);
      setNextNakath(getNextNakath(updatedUpcoming));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <NewYearDawnMessage />
      <AutoPlayAudio />

      
      
      <Header />
      
      <Container className="my-5">
        {nextNakath && (
          <Alert variant="warning" className="mb-4">
            <div className="d-flex align-items-center">
              <i className="bi bi-star-fill fs-4 me-2"></i>
              <span className="sinhala-font">
                <strong>ඊළඟ නැකත:</strong> {nextNakath.name} ({nextNakath.date} {nextNakath.time})
              </span>
              <br/>  <br/>
            </div>
          </Alert>
        )}

        <Row>
          {nakathTimes2025.map(nakath => {
            const isNext = nextNakath?.id === nakath.id;
            const isUpcoming = upcomingNakaths.some(up => up.id === nakath.id);
            
            return (
              <NakathCard 
                key={nakath.id} 
                nakath={nakath}
                isNextUpcoming={isNext}
                isUpcoming={isUpcoming}
              />
            );
          })}
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
}

export default App;