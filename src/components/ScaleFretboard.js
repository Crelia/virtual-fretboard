// src/components/ScaleFretboard.js
import React from 'react';

// Standard note names (we use sharps for simplicity)
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Helper: Normalize note names (convert flats to sharps)
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

// Given an open note and a fret number, compute the note at that fret.
function getNoteName(openNote, fret) {
  const openIndex = NOTES.indexOf(normalizeNote(openNote));
  if (openIndex === -1) return "";
  const noteIndex = (openIndex + fret) % 12;
  return NOTES[noteIndex];
}

const ScaleFretboard = ({ scaleNotes, fretsToShow = 32 }) => {
  // Standard guitar tuning (low E to high E)
  const tuning = ["E", "A", "D", "G", "B", "E"];
  // Normalize the scale notes for consistent comparison.
  const normalizedScaleNotes = scaleNotes.map(note => normalizeNote(note));

  // Color mapping for each note.
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

  // Adjust dimensions. For more frets we want a wider diagram.
  const width = 1000; // You can adjust as needed
  const height = 200;
  const marginLeft = 50; // Space on the left for fret numbers
  const marginTop = 20;
  const fretboardWidth = width - marginLeft;
  const fretboardHeight = height - marginTop;
  const fretSpacing = fretboardWidth / fretsToShow;
  const stringSpacing = fretboardHeight / (tuning.length - 1);

  return (
    <svg width={width} height={height}>
      {/* Draw fret lines */}
      {Array.from({ length: fretsToShow + 1 }).map((_, i) => {
        const x = marginLeft + i * fretSpacing;
        return (
          <line
            key={`fret-${i}`}
            x1={x}
            y1={marginTop}
            x2={x}
            y2={height}
            stroke="black"
            strokeWidth={i === 0 ? 4 : 2}
          />
        );
      })}
      {/* Draw strings */}
      {tuning.map((openNote, i) => {
        const y = marginTop + i * stringSpacing;
        return (
          <line
            key={`string-${i}`}
            x1={marginLeft}
            y1={y}
            x2={width}
            y2={y}
            stroke="black"
            strokeWidth={2}
          />
        );
      })}
      {/* Fret numbers (drawn on the fret lines) */}
      {Array.from({ length: fretsToShow + 1 }).map((_, i) => {
        const x = marginLeft + i * fretSpacing;
        return (
          <text key={`fret-number-${i}`} x={x} y={marginTop - 5} fontSize="10" textAnchor="middle">
            {i}
          </text>
        );
      })}
      {/* Mark and color-code scale note positions within fret cells */}
      {tuning.map((openNote, stringIndex) => {
        const y = marginTop + stringIndex * stringSpacing;
        // Iterate over fret cells (0 to fretsToShow - 1)
        return Array.from({ length: fretsToShow }).map((_, cellIndex) => {
          const fret = cellIndex; // cell 0 corresponds to the space between fret 0 and fret 1
          const noteName = getNoteName(openNote, fret);
          const normalized = normalizeNote(noteName);
          const inScale = normalizedScaleNotes.includes(normalized);
          if (inScale) {
            // Place marker in the center of the cell.
            const x = marginLeft + (fret + 0.5) * fretSpacing;
            const fillColor = noteColors[normalized] || "lightgreen";
            return (
              <g key={`note-${stringIndex}-${fret}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={8}
                  fill={fillColor}
                  stroke="black"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={y + 4}
                  fontSize="8"
                  textAnchor="middle"
                >
                  {noteName}
                </text>
              </g>
            );
          }
          return null;
        });
      })}
    </svg>
  );
};

export default ScaleFretboard;
