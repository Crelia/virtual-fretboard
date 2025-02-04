// src/components/Fretboard.js
import React from 'react';

// Note colors mapping – same as used in ScaleFretboard and KeyDetails.
const noteColors = {
  "C": "#e57373",    // red lighten-2
  "C#": "#f06292",   // pink lighten-2
  "D": "#ba68c8",    // purple lighten-2
  "D#": "#9575cd",   // deep purple lighten-2
  "E": "#7986cb",    // indigo lighten-2
  "F": "#64b5f6",    // blue lighten-2
  "F#": "#4fc3f7",   // light blue lighten-2
  "G": "#4dd0e1",    // cyan lighten-2
  "G#": "#4db6ac",   // teal lighten-2
  "A": "#81c784",    // green lighten-2
  "A#": "#aed581",   // light green lighten-2
  "B": "#dce775"     // lime lighten-2
};

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Helper to convert flats to sharps.
function normalizeNote(note) {
  const flatToSharp = {
    "Db": "C#",
    "Eb": "D#",
    "Fb": "E",
    "Gb": "F#",
    "Ab": "G#",
    "Bb": "A#",
    "Cb": "B"
  };
  return flatToSharp[note] || note;
}

// Given an open note (string tuning) and a fret number, return the note at that fret.
function getNoteName(openNote, fret) {
  const openIndex = NOTES.indexOf(normalizeNote(openNote));
  if (openIndex === -1) return "";
  const noteIndex = (openIndex + fret) % 12;
  return NOTES[noteIndex];
}

const Fretboard = ({ chord }) => {
  // Defensive check: if no chord or chord.frets is undefined, return null.
  if (!chord || !chord.frets) return null;

  const fretsData = chord.frets;
  const fingersData = chord.fingers || [];
  const baseFret = chord.baseFret || 1;

  // For our diagram we assume a fixed number of frets to display.
  const numFretsToShow = 5;
  const stringCount = 6;

  // Dimensions for the SVG diagram.
  const width = 240;
  const height = 300;
  const nutHeight = 20; // Top margin for nut/open-string indicators.
  const fretSpacing = (height - nutHeight) / numFretsToShow;
  const stringSpacing = width / (stringCount + 1);
  const stringPositions = Array.from({ length: stringCount }, (_, i) => (i + 1) * stringSpacing);

  // Standard tuning (low E to high E).
  const tuning = ["E", "A", "D", "G", "B", "E"];

  return (
    <svg width={width} height={height} style={{ display: 'block', margin: 'auto' }}>
      {/* Draw the nut (if baseFret is 1) or display the base fret number if moveable */}
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
        <line key={i} x1={x} y1={nutHeight} x2={x} y2={height} stroke="black" strokeWidth="2" />
      ))}
      {/* Draw fret lines */}
      {Array.from({ length: numFretsToShow }).map((_, i) => {
        const y = nutHeight + (i + 1) * fretSpacing;
        return (
          <line key={i} x1={stringPositions[0]} y1={y} x2={stringPositions[stringCount - 1]} y2={y} stroke="black" strokeWidth="2" />
        );
      })}
      {/* Render markers for each string */}
      {fretsData.map((fret, index) => {
        const x = stringPositions[index];
        // If the string is muted.
        if (fret === "x") {
          return (
            <text key={index} x={x} y={nutHeight - 5} textAnchor="middle" fontSize="14">
              X
            </text>
          );
        }
        // If the string is open.
        if (fret === "0") {
          return (
            <circle
              key={index}
              cx={x}
              cy={nutHeight - 10}
              r="6"
              fill="white"
              stroke="black"
              strokeWidth="2"
            />
          );
        }
        // For a fingered note:
        // Convert the fret from the chord data (which is the actual fret number)
        const fretNum = parseInt(fret, 10);
        // Compute the note produced on this string.
        const noteName = getNoteName(tuning[index], fretNum);
        const fillColor = noteColors[noteName] || "#1976d2";
        // Determine the relative fret position for display:
        // We subtract the baseFret so that the first fret in the diagram corresponds to baseFret.
        const relativeFret = fretNum - baseFret;
        if (relativeFret < 0 || relativeFret >= numFretsToShow) return null;
        const y = nutHeight + (relativeFret + 0.5) * fretSpacing;
        return (
          <g key={`finger-${index}`}>
            <circle
              cx={x}
              cy={y}
              r="10"
              fill={fillColor}
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
      {/* Optionally, add barre chord markers here if needed */}
    </svg>
  );
};

export default Fretboard;
