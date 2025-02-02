// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Stack, Chip } from '@mui/material';
import ChordSelector from './components/ChordSelector';
import KeyDetails from './components/KeyDetails';
import ScaleFretboard from './components/ScaleFretboard';
import Fretboard from './components/Fretboard';
import ChordDetails from './components/ChordDetails';

// Helper function to get chords in key by comparing triad note labels to scale notes.
function getChordsInKey(chordData, selectedKeyData) {
  if (!chordData || !selectedKeyData) return [];
  const scaleNotes = selectedKeyData.notes; // e.g., ["C", "D", "E", "F", "G", "A", "B"]
  const suggestions = [];

  Object.entries(chordData).forEach(([chordKey, chord]) => {
    if (chord.triads && chord.triads.length > 0) {
      chord.triads.forEach(triadObj => {
        const match = triadObj.label.match(/\((.*?)\)/);
        if (match) {
          const triadNotes = match[1].split('-').map(note => note.trim());
          const allInKey = triadNotes.every(note => scaleNotes.includes(note));
          if (allInKey) {
            suggestions.push({
              chordKey,
              chordName: chord.name,
            });
          }
        }
      });
    }
  });
  // Remove duplicates
  return suggestions.filter((v, i, a) =>
    a.findIndex(t => t.chordKey === v.chordKey) === i
  );
}

function App() {
  // Data from backend.
  const [chordData, setChordData] = useState(null);
  const [keyData, setKeyData] = useState(null);

  // Selected chord (e.g., "G", "C", etc.)
  const [selectedChord, setSelectedChord] = useState(null);
  // State for fingering navigation.
  const [fingeringIndex, setFingeringIndex] = useState(0);
  const [customFingering, setCustomFingering] = useState(null);

  // Fetch chord data.
  useEffect(() => {
    fetch('http://localhost:5001/api/chords')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch chord data');
        return res.json();
      })
      .then(data => {
        setChordData(data);
        const keys = Object.keys(data);
        if (keys.length > 0) {
          setSelectedChord(keys[0]);
        }
      })
      .catch(err => console.error('Error fetching chord data:', err));
  }, []);

  // Fetch key data.
  useEffect(() => {
    fetch('http://localhost:5001/api/keys')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch key data');
        return res.json();
      })
      .then(data => {
        setKeyData(data);
      })
      .catch(err => console.error('Error fetching key data:', err));
  }, []);

  // Reset fingering state when selected chord changes.
  useEffect(() => {
    setFingeringIndex(0);
    setCustomFingering(null);
  }, [selectedChord]);

  if (!chordData) return <div>Loading chord data...</div>;
  if (!keyData) return <div>Loading key data...</div>;
  if (!selectedChord) return <div>Loading selected chord...</div>;

  // Derive key details from the selected chord.
  // This assumes the chord key exists in keyData.keys, or try a fallback by stripping a trailing "m".
  const selectedKeyData =
    keyData.keys[selectedChord] ||
    keyData.keys[selectedChord.replace(/m$/, '')];

  const chord = chordData[selectedChord];
  const defaultFingering = chord.positions ? chord.positions[fingeringIndex] : chord;
  const currentFingering = customFingering || defaultFingering;

  // Compute chords in the key.
  const chordsInKey = getChordsInKey(chordData, selectedKeyData);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Virtual Guitar Fretboard & Music Practice Tool
      </Typography>

      {/* Chord selection */}
      <ChordSelector
        chords={Object.keys(chordData)}
        selectedChord={selectedChord}
        onChange={setSelectedChord}
      />

      {/* Display chords suggested for the selected key */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Chords in the Key of {selectedChord}
      </Typography>
      <Stack direction="row" spacing={1} style={{ marginBottom: '20px' }}>
        {chordsInKey.length > 0 ? (
          chordsInKey.map((suggestion, idx) => (
            <Chip
              key={idx}
              label={suggestion.chordName}
              onClick={() => {
                setSelectedChord(suggestion.chordKey);
                setCustomFingering(null);
              }}
              style={{ cursor: 'pointer' }}
            />
          ))
        ) : (
          <Typography variant="body2">No chord suggestions available.</Typography>
        )}
      </Stack>

      {/* Fretboard showing chord fingering */}
      <Fretboard chord={currentFingering} highlightNotes={selectedKeyData.notes} />

      {/* Chord details: clickable triads and variations */}
      <ChordDetails
        chord={chord}
        onSelectFingering={(position) => setCustomFingering(position)}
      />

      {/* Navigation for default chord positions */}
      {chord.positions && chord.positions.length > 1 && !customFingering && (
        <Stack direction="row" spacing={2} justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            disabled={fingeringIndex <= 0}
            onClick={() => setFingeringIndex(prev => prev - 1)}
          >
            Move Down
          </Button>
          <Button
            variant="contained"
            disabled={fingeringIndex >= chord.positions.length - 1}
            onClick={() => setFingeringIndex(prev => prev + 1)}
          >
            Move Up
          </Button>
        </Stack>
      )}

      {/* Reset button for custom fingering */}
      {customFingering && (
        <Stack direction="row" justifyContent="center" marginTop="20px">
          <Button variant="outlined" onClick={() => setCustomFingering(null)}>
            Reset to Default
          </Button>
        </Stack>
      )}

      <ScaleFretboard scaleNotes={selectedKeyData.notes} fretsToShow={24} />

      {/* Display the scale on a fretboard */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Scale for Key of {selectedChord}
      </Typography>

      {/* Display key details */}
      <KeyDetails keyData={selectedKeyData} />
      
    </Container>
  );
}

export default App;
