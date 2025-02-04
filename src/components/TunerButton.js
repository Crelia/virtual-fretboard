// src/components/TunerButton.js
import React from 'react';

const TunerButton = ({ onClick }) => {
  const buttonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(145deg, #f0f0f0, #cacaca)',
    boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    outline: 'none',
    transition: 'transform 0.1s ease'
  };

  const hoverStyle = {
    transform: 'scale(1.05)'
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      style={{ ...buttonStyle, ...(isHovered ? hoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label="Toggle Tuner"
    >
      🎸
    </button>
  );
};

export default TunerButton;
