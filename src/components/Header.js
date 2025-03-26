import React from 'react';
import newImage5 from '../images/sun.png';

const Header = () => {
  return (
    <header className="bg-warning text-dark py-4 mb-4">
      <div className="container">
        <div className="row align-items-center">
          {/* Image Section - Keep it in the current position */}
          <div className="col-12 col-md-auto text-center text-md-start">
            <img 
              className="img-fluid" 
              src={newImage5} 
              alt="New Year" 
              width="180" 
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Text Section - Centered */}
          <div className="col d-flex flex-column align-items-center text-center mt-3 mt-md-0">
            <h1 
              className="display-5 fw-bold" 
              style={{ fontFamily: "'Abhaya Libre', serif" , fontSize: "3.5rem"}}
            >
              සිංහල හා හින්දු අලුත් අවුරුද්ද <br />
              <span 
                style={{ fontFamily: "Arial Unicode MS", fontWeight: "bold" , fontSize: "2.5rem"}}
              >
                சிங்கள மற்றும் இந்து புத்தாண்டு
              </span> <br />
              <span style={{ fontWeight: "bold" }}>Sinhala and Tamil New Year</span> <br />
              <span style={{ fontWeight: "bold" }}>2025</span>
            </h1>
            <p 
              className="lead fw-bold" 
              style={{ fontFamily: "'Abhaya Libre', serif", fontSize: "1.5rem" }}
            >
              නැකත් වේලාවන් සහ අලුත් අවුරුදු චාරිත්‍ර  
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
