// src/components/NewYearDawnPopup.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const NewYearDawnMessage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const checkNewYearTime = () => {
      const now = new Date();
      const newYearTime = new Date('2025-04-14T03:21:00');
      
      const isAfterNewYearDawn = (now - newYearTime) > 0 && 
                                (now - newYearTime) < 60000;

      if (isAfterNewYearDawn) {
        setShowPopup(true);
        
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setShowPopup(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      }
    };

    checkNewYearTime();
    const interval = setInterval(checkNewYearTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Modal 
      show={showPopup} 
      onHide={() => setShowPopup(false)}
      centered
      backdrop="static"
      keyboard={false}
      className="new-year-message-modal"
    >
      <Modal.Header closeButton className="bg-warning border-0">
        <Modal.Title className="sinhala-font" style={styles.title}>
          <i className="bi bi-stars me-2"></i>
          සුබ අලුත් අවුරුද්දක් වේවා!
          <i className="bi bi-stars ms-2"></i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4" style={styles.body}>
        <h4 className="sinhala-font mb-4" style={styles.heading}>
          අලුත් අවුරුද්ද උදාවී ඇත!
        </h4>
        <p className="sinhala-font mb-4" style={styles.message}>
          ලැබුවා වූ සිංහල හා හින්දු අලුත් අවුරුද්ද ලෝක වාසී<br />
          සියලු දෙනාට සාමය සතුට සෞභාග්‍ය සපිරි<br />
          සුබ අලුත් අවුරුද්දක් වේවා...!
        </p>
        <div className="mt-3">
          <small className="text-muted" style={styles.timer}>
            <i className="bi bi-clock-history me-1"></i>
            මෙම පණිවුඩය ස්වයංක්‍රීයව වසා දමනු ඇත: {timeLeft} තත්පර
          </small>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button 
          variant="warning"
          onClick={() => setShowPopup(false)}
          className="sinhala-font py-2 px-4"
          style={styles.button}
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          හරි
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const styles = {
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#d35400',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    width: '100%',
    textAlign: 'center'
  },
  heading: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#e67e22',
    marginBottom: '1.5rem'
  },
  message: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#333',
    fontWeight: '500'
  },
  timer: {
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  button: {
    fontWeight: '600',
    borderRadius: '50px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
};

export default NewYearDawnMessage;