// src/components/ScaleFretboard.js
import React from 'react';

// Standard note names (using sharps for simplicity)
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

const ScaleFretboard = ({ scaleNotes, fretsToShow = 24 }) => {
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

  // Dimensions for our SVG fretboard.
  const width = 1000; // Adjust as needed.
  const height = 200;
  const marginLeft = 50; // Space on the left for fret numbers.
  const marginTop = 20;
  const fretboardWidth = width - marginLeft;
  const fretboardHeight = height - marginTop;
  const fretSpacing = fretboardWidth / fretsToShow;
  const stringSpacing = fretboardHeight / (tuning.length - 1);

  return (
    <svg width={width*1.2} height={height*1.2}>
      {/* Draw fret lines: Draw the nut (fret 0) plus lines for frets 1 .. fretsToShow */}
      {Array.from({ length: fretsToShow + 1 }).map((_, i) => {
        const x = marginLeft + i * fretSpacing;
        return (
          <line
            key={`fret-line-${i}`}
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

      {/* Fret numbers: Draw the Nut label separately and then frets 1..fretsToShow */}
      {Array.from({ length: fretsToShow }).map((_, i) => {
        const fretNumber = i + 1;
        // Place the number in the center of the fret cell:
        const x = marginLeft + (fretNumber - 0.5) * fretSpacing;
        return (
          <text
            key={`fret-number-${fretNumber}`}
            x={x}
            y={marginTop - 5}
            fontSize="10"
            textAnchor="middle"
          >
            {fretNumber}
          </text>
        );
      })}

      {/* Mark and color-code scale note positions for frets 1 to fretsToShow */}
      {tuning.map((openNote, stringIndex) => {
        const y = marginTop + stringIndex * stringSpacing;
        const markers = [];
        // Iterate over frets 1 to fretsToShow.
        for (let fret = 1; fret <= fretsToShow; fret++) {
          const noteName = getNoteName(openNote, fret);
          if (!noteName) continue;
          const normalized = normalizeNote(noteName);
          const inScale = normalizedScaleNotes.includes(normalized);
          if (inScale) {
            // Place marker in the center of the fret cell.
            const x = marginLeft + (fret - 0.5) * fretSpacing;
            const fillColor = noteColors[normalized] || "lightgreen";
            markers.push(
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
        }
        return markers;
      })}
    </svg>
  );
};

export default ScaleFretboard;
