// src/components/NakathCard.js
import React from 'react';
import CountdownTimer from './CountdownTimer';
import { formatDateTime } from '../services/timeService';
import { Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

const NakathCard = ({ nakath, isNextUpcoming }) => {
  const targetDate = formatDateTime(nakath.date, nakath.time);

  return (
    <motion.div
      className="col-md-6 col-lg-4 mb-4 d-flex"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isNextUpcoming ? 1.02 : 1
      }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: isNextUpcoming ? 1.05 : 1.03
      }}
    >
      <motion.div
        className="w-100"
        whileTap={{ scale: 0.98 }}
      >
        <Card 
          className={`nakath-card h-100 d-flex flex-column ${isNextUpcoming ? 'next-upcoming' : ''}`}
          style={{
            border: isNextUpcoming ? '4px solid #e67e22' : '1px solid #e0e0e0',
            boxShadow: isNextUpcoming ? '0 5px 25px rgba(169, 218, 34, 0.3)' : '0 4px 8px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Next Upcoming Badge */}
          {isNextUpcoming && (
            <div className="position-absolute top-0 end-0 m-2">
              <Badge bg="warning" pill className="px-3 py-2 shadow-sm">
                <i className="bi bi-star-fill me-1"></i>
                ඊළඟ නැකත
              </Badge>
            </div>
          )}

          <motion.div
            className="image-container"
            style={{ 
              height: '200px', 
              overflow: 'hidden',
              filter: isNextUpcoming ? 'brightness(1.1)' : 'brightness(0.98)'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Card.Img 
              variant="top" 
              src={nakath.image} 
              className="h-100 w-100 object-fit-cover"
            />
          </motion.div>
          
          <Card.Body className="d-flex flex-column flex-grow-1">
            <div className="mb-3">
              <Badge 
                bg={isNextUpcoming ? "danger" : "secondary"}
                text="white"
                className="mb-2 px-3 py-2 rounded-pill"
                style={{ fontSize: '1.5rem' }}
              >
                {nakath.date}
              </Badge>
              
              <Card.Title 
                className="sinhala-font mb-3" 
                style={{ 
                  fontSize: '2.3rem',
                  fontWeight: '600',
                  color: isNextUpcoming ? '#e67e22' : '#d35400',
                  minHeight: '3.5rem'
                }}
              >
                {nakath.name}
              </Card.Title>
              
              <Card.Text 
                className="text-muted mb-3 d-flex align-items-center"
                style={{ fontSize: '0.9rem' }}
              >
                <i className={`bi bi-clock-history me-2 ${isNextUpcoming ? 'text-warning' : ''}`}></i>
                {nakath.time}
              </Card.Text>
              
              <Card.Text 
                className="sinhala-font mb-4" 
                style={{ 
                  fontSize: '1.3rem',
                  fontwaight: '500',
                  color: isNextUpcoming ? '#444' : '#555',
                  lineHeight: '1.6',
                  flexGrow: 1
                }}
              >
                {nakath.description}
              </Card.Text>
            </div>
            
            <motion.div
              className="mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div 
                className="countdown-container p-3 rounded"
                style={{
                  background: isNextUpcoming 
                    ? 'rgba(255, 213, 79, 0.4)' 
                    : 'rgba(255, 236, 179, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: isNextUpcoming 
                    ? '1px solid rgba(230, 126, 34, 0.5)'
                    : '1px solid rgba(255, 213, 79, 0.2)'
                }}
              >
                <CountdownTimer 
                  targetDate={targetDate} 
                  isHighlighted={isNextUpcoming}
                />
              </div>
            </motion.div>
          </Card.Body>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default NakathCard;