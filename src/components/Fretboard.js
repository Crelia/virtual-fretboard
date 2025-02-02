// src/components/Fretboard.js
import React from 'react';

const Fretboard = ({ chord }) => {
  const fretsData = chord.frets;
  const fingersData = chord.fingers || [];
  const baseFret = chord.baseFret || 1;
  const numFrets = 5; // Number of frets to display in the diagram
  const stringCount = 6;
  
  // Dimensions for the diagram
  const width = 300;
  const height = 350;
  const nutHeight = 20; // Top margin for nut/open-string indicators
  const fretSpacing = (height - nutHeight) / numFrets;
  const stringSpacing = width / (stringCount + 1);
  
  // X positions for each string (0: low E, 5: high E)
  const stringPositions = Array.from({ length: stringCount }, (_, i) => (i + 1) * stringSpacing);
  
  // Marker radius for finger placements
  const markerRadius = 14;
  
  return (
    <svg width={width} height={height} style={{ display: 'block', margin: 'auto' }}>
      {/* Draw the nut (if baseFret is 1) or a fret number indicator if moveable */}
      {baseFret === 1 ? (
        <line
          x1={stringPositions[0]}
          y1={nutHeight}
          x2={stringPositions[stringCount - 1]}
          y2={nutHeight}
          stroke="black"
          strokeWidth="6"
        />
      ) : (
        <text
          x={stringPositions[0] - 30}
          y={nutHeight + fretSpacing / 2}
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {baseFret}
        </text>
      )}
      
      {/* Draw each string */}
      {stringPositions.map((x, i) => (
        <line key={`string-${i}`} x1={x} y1={nutHeight} x2={x} y2={height} stroke="black" strokeWidth="2" />
      ))}
      
      {/* Draw the fret lines */}
      {Array.from({ length: numFrets }).map((_, i) => {
        const y = nutHeight + (i + 1) * fretSpacing;
        return (
          <line
            key={`fret-${i}`}
            x1={stringPositions[0]}
            y1={y}
            x2={stringPositions[stringCount - 1]}
            y2={y}
            stroke="black"
            strokeWidth="2"
          />
        );
      })}
      
      {/* Render open strings, muted strings, and finger markers */}
      {fretsData.map((fret, index) => {
        const x = stringPositions[index];
        // Muted string indicator
        if (fret === "x") {
          return (
            <text key={`mute-${index}`} x={x} y={nutHeight - 5} textAnchor="middle" fontSize="16">
              X
            </text>
          );
        }
        // Open string indicator
        if (fret === "0") {
          return (
            <circle
              key={`open-${index}`}
              cx={x}
              cy={nutHeight - 10}
              r="10"
              fill="white"
              stroke="black"
              strokeWidth="2"
            />
          );
        }
        // Fingered note: calculate relative fret position based on baseFret
        const fretNum = parseInt(fret, 10);
        const relativeFret = fretNum - baseFret; // 0 corresponds to the first fret displayed
        if (relativeFret < 0 || relativeFret >= numFrets) return null;
        const y = nutHeight + (relativeFret + 0.5) * fretSpacing;
        return (
          <g key={`finger-${index}`}>
            <circle
              cx={x}
              cy={y}
              r={markerRadius}
              fill="#1976d2"
              stroke="black"
              strokeWidth="2"
            />
            {fingersData[index] && (
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {fingersData[index]}
              </text>
            )}
          </g>
        );
      })}
      
      {/* Render barre indicators if the chord defines any */}
      {chord.barres &&
        chord.barres.map((barre, idx) => {
          const relativeFret = barre.fret - baseFret;
          if (relativeFret < 0 || relativeFret >= numFrets) return null;
          const y = nutHeight + (relativeFret + 0.5) * fretSpacing;
          const xStart = stringPositions[barre.from];
          const xEnd = stringPositions[barre.to];
          const barreWidth = xEnd - xStart + markerRadius * 2;
          return (
            <g key={`barre-${idx}`}>
              <rect
                x={xStart - markerRadius}
                y={y - markerRadius}
                width={barreWidth}
                height={markerRadius * 2}
                rx={markerRadius}
                fill="#1976d2"
                opacity="0.6"
              />
              {barre.finger && (
                <text
                  x={(xStart + xEnd) / 2}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {barre.finger}
                </text>
              )}
            </g>
          );
        })}
      
      {/* If the chord is moveable, display fret numbers along the side */}
      {baseFret > 1 &&
        Array.from({ length: numFrets }).map((_, i) => {
          const fretNumber = baseFret + i;
          const y = nutHeight + (i + 0.5) * fretSpacing;
          return (
            <text
              key={`fret-number-${i}`}
              x={stringPositions[stringPositions.length - 1] + 20}
              y={y}
              fontSize="14"
              dominantBaseline="middle"
            >
              {fretNumber}
            </text>
          );
        })}
    </svg>
  );
};

export default Fretboard;
