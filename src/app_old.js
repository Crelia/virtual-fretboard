// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Stack, Chip } from '@mui/material';
import ChordSelector from './components/ChordSelector';
import KeySelector from './components/KeySelector';
import KeyDetails from './components/KeyDetails';
import Fretboard from './components/Fretboard';
import ChordDetails from './components/ChordDetails';

// Helper function: Given chordData and the selected key data, return an array of chords that “fit” the key.
function getChordsInKey(chordData, selectedKeyData) {
  if (!chordData || !selectedKeyData) return [];
  const scaleNotes = selectedKeyData.notes; // e.g., ["C", "D", "E", "F", "G", "A", "B"]
  const suggestions = [];

  Object.entries(chordData).forEach(([chordKey, chord]) => {
    if (chord.triads && chord.triads.length > 0) {
      chord.triads.forEach(triadObj => {
        // Expect label to be in the form "Triad (C-E-G)"
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
  // Remove duplicates (if a chord fits in multiple triads)
  return suggestions.filter((v, i, a) =>
    a.findIndex(t => t.chordKey === v.chordKey) === i
  );
}

function App() {
  // State to store fetched data.
  const [chordData, setChordData] = useState(null);
  const [keyData, setKeyData] = useState(null);

  // Selected chord key (e.g., "C", "G", etc.)
  const [selectedChord, setSelectedChord] = useState(null);
  // Selected key for the scale (e.g., "C", "Am", etc.)
  const [selectedKey, setSelectedKey] = useState(null);

  // State for default fingering index (for chord.positions) and custom fingering override.
  const [fingeringIndex, setFingeringIndex] = useState(0);
  const [customFingering, setCustomFingering] = useState(null);

  // Fetch chord data from the backend.
  useEffect(() => {
    fetch('http://localhost:5001/api/chords')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch chord data');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched chord data:', data);
        setChordData(data);
        const keys = Object.keys(data);
        if (keys.length > 0) {
          setSelectedChord(keys[0]);
        }
      })
      .catch(err => console.error('Error fetching chord data:', err));
  }, []);

  // Fetch key data from the backend.
  useEffect(() => {
    fetch('http://localhost:5001/api/keys')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch key data');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched key data:', data);
        setKeyData(data);
        const keys = data && data.keys ? Object.keys(data.keys) : [];
        if (keys.length > 0) {
          setSelectedKey(keys[0]);
        }
      })
      .catch(err => console.error('Error fetching key data:', err));
  }, []);

  // Reset fingering states when selected chord changes.
  useEffect(() => {
    setFingeringIndex(0);
    setCustomFingering(null);
  }, [selectedChord]);

  // Debug logging: Uncomment these to see the state values in the console.
  // console.log("chordData:", chordData);
  // console.log("keyData:", keyData);
  // console.log("selectedChord:", selectedChord);
  // console.log("selectedKey:", selectedKey);

  // Use separate loading messages to identify which data is not loaded.
  if (!chordData) {
    return <div>Loading chord data...</div>;
  }
  if (!keyData) {
    return <div>Loading key data...</div>;
  }
  if (!selectedChord) {
    return <div>Loading selected chord...</div>;
  }
  if (!selectedKey) {
    return <div>Loading selected key...</div>;
  }

  const chord = chordData[selectedChord];
  const defaultFingering = chord.positions ? chord.positions[fingeringIndex] : chord;
  const currentFingering = customFingering || defaultFingering;
  const selectedKeyData = keyData.keys[selectedKey];
  const chordsInKey = getChordsInKey(chordData, selectedKeyData);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Virtual Guitar Fretboard & Music Practice Tool
      </Typography>

      {/* Key selection and details */}
      <KeySelector
        keyList={Object.keys(keyData.keys)}
        selectedKey={selectedKey}
        onChange={setSelectedKey}
      />
      <KeyDetails keyData={selectedKeyData} />

      {/* Display chords suggested for the selected key */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Chords in the Key of {selectedKey}
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

      {/* Chord selector for manual chord choice */}
      <ChordSelector
        chords={Object.keys(chordData)}
        selectedChord={selectedChord}
        onChange={setSelectedChord}
      />

      {/* Fretboard: Pass current fingering and selected key's notes for optional highlighting */}
      <Fretboard chord={currentFingering} highlightNotes={selectedKeyData.notes} />

      {/* Chord details with clickable triads and variations */}
      <ChordDetails
        chord={chord}
        onSelectFingering={(position) => setCustomFingering(position)}
      />

      {/* Navigation buttons for default chord positions (only if no custom fingering is active) */}
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

      {/* Reset button if a custom fingering is active */}
      {customFingering && (
        <Stack direction="row" justifyContent="center" marginTop="20px">
          <Button variant="outlined" onClick={() => setCustomFingering(null)}>
            Reset to Default
          </Button>
        </Stack>
      )}
    </Container>
  );
}

export default App;
