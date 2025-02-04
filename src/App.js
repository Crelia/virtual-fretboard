// src/App.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  IconButton,
  Modal,
  Box,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ChordSelector from './components/ChordSelector';
import KeyDetails from './components/KeyDetails';
import ScaleFretboard from './components/ScaleFretboard';
import Fretboard from './components/Fretboard';
import ChordDetails from './components/ChordDetails';
import Tuner from './components/Tuner';

// Standard tuning for guitar (low E to high E)
const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"];

// Mapping of scale types to their interval patterns (in semitones)
const SCALE_PATTERNS = {
  "Major (Ionian)": [2, 2, 1, 2, 2, 2, 1],
  "Dorian": [2, 1, 2, 2, 2, 1, 2],
  "Phrygian": [1, 2, 2, 2, 1, 2, 2],
  "Lydian": [2, 2, 2, 1, 2, 2, 1],
  "Mixolydian": [2, 2, 1, 2, 2, 1, 2],
  "Minor (Aeolian / Natural Minor)": [2, 1, 2, 2, 1, 2, 2],
  "Locrian": [1, 2, 2, 1, 2, 2, 2],
  "Harmonic Minor": [2, 1, 2, 2, 1, 3, 1],
  "Melodic Minor (Ascending)": [2, 1, 2, 2, 2, 2, 1]
};

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

// Helper: Given an open note and a fret number, compute the note at that fret.
function getNoteName(openNote, fret) {
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const openIndex = NOTES.indexOf(normalizeNote(openNote));
  if (openIndex === -1) return "";
  const noteIndex = (openIndex + fret) % 12;
  return NOTES[noteIndex];
}

// Helper: Generate a scale given a root note and an interval pattern.
function generateScale(root, pattern) {
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  let scale = [normalizeNote(root)];
  let currentIndex = NOTES.indexOf(normalizeNote(root));
  pattern.forEach(interval => {
    currentIndex = (currentIndex + interval) % 12;
    scale.push(NOTES[currentIndex]);
  });
  // Remove the octave duplicate.
  scale.pop();
  return scale;
}

// Compute diatonic chords from a scale using standard theory.
function computeDiatonicChords(scale, scaleType) {
  const chords = [];
  if (scaleType.includes("Major") || scaleType.includes("Ionian") || scaleType === "Lydian" || scaleType === "Mixolydian") {
    chords.push({ degree: "I", chordName: scale[0], quality: "major" });
    chords.push({ degree: "ii", chordName: scale[1] + "m", quality: "minor" });
    chords.push({ degree: "iii", chordName: scale[2] + "m", quality: "minor" });
    chords.push({ degree: "IV", chordName: scale[3], quality: "major" });
    chords.push({ degree: "V", chordName: scale[4], quality: "major" });
    chords.push({ degree: "vi", chordName: scale[5] + "m", quality: "minor" });
    chords.push({ degree: "vii°", chordName: scale[6] + "dim", quality: "diminished" });
  } else if (
    scaleType.includes("Minor") ||
    scaleType.includes("Aeolian") ||
    scaleType === "Dorian" ||
    scaleType === "Phrygian" ||
    scaleType === "Locrian"
  ) {
    chords.push({ degree: "i", chordName: scale[0] + "m", quality: "minor" });
    chords.push({ degree: "ii°", chordName: scale[1] + "dim", quality: "diminished" });
    chords.push({ degree: "III", chordName: scale[2], quality: "major" });
    chords.push({ degree: "iv", chordName: scale[3] + "m", quality: "minor" });
    chords.push({ degree: "v", chordName: scale[4] + "m", quality: "minor" });
    chords.push({ degree: "VI", chordName: scale[5], quality: "major" });
    chords.push({ degree: "VII", chordName: scale[6], quality: "major" });
  }
  return chords;
}

// Style for the Tuner modal.
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: '8px'
};

function App() {
  // Data from backend.
  const [chordData, setChordData] = useState(null);
  const [keyData, setKeyData] = useState(null);

  // Selected chord (e.g., "G", "C", etc.)
  const [selectedChord, setSelectedChord] = useState(null);
  // State for fingering navigation.
  const [fingeringIndex, setFingeringIndex] = useState(0);
  const [customFingering, setCustomFingering] = useState(null);

  // State to control the tuner modal.
  const [showTuner, setShowTuner] = useState(false);
  // Snackbar for chords not in DB.
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // State for selected scale type.
  const [selectedScaleType, setSelectedScaleType] = useState("Major (Ionian)");

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

  // Use the key data if available; otherwise, derive the root from selectedChord.
  const rootNote = keyData.keys[selectedChord]
    ? keyData.keys[selectedChord].notes[0]
    : selectedChord.replace(/m$/, "");

  // Generate the scale from the selected root and selected scale type.
  const computedScale = generateScale(rootNote, SCALE_PATTERNS[selectedScaleType]);

  // Compute diatonic chords from the computed scale.
  const computedChords = computeDiatonicChords(computedScale, selectedScaleType);

  // Handler for clicking a computed chord.
  const handleComputedChordClick = (compChord) => {
    if (chordData[compChord.chordName]) {
      setSelectedChord(compChord.chordName);
      setCustomFingering(null);
    } else {
      setSnackbarMessage(`Chord ${compChord.chordName} has not been added yet.`);
      setSnackbarOpen(true);
    }
  };

  // Handler for triad/variation selection.
  const handleTriadClick = (position) => {
    console.log("Triad/variation selected:", position);
    // Use deep clone to ensure React sees a new object.
    setCustomFingering(JSON.parse(JSON.stringify(position)));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px', position: 'relative' }}>
      {/* Tuner button at top right */}
      <IconButton
        onClick={() => setShowTuner(true)}
        style={{ position: 'absolute', top: 10, right: 10 }}
        color="primary"
        size="large"
      >
        <TuneIcon fontSize="inherit" />
      </IconButton>

      <Typography variant="h3" align="center" gutterBottom>
        PIckinBuddy - Guitar Practice Tool
      </Typography>

      {/* Chord selection */}
      <ChordSelector
        chords={Object.keys(chordData)}
        selectedChord={selectedChord}
        onChange={setSelectedChord}
      />

      {/* Scale type selection */}
      <FormControl fullWidth variant="outlined" style={{ marginTop: '20px' }}>
        <InputLabel id="scale-type-label">Scale Type</InputLabel>
        <Select
          labelId="scale-type-label"
          value={selectedScaleType}
          label="Scale Type"
          onChange={(e) => setSelectedScaleType(e.target.value)}
        >
          {Object.keys(SCALE_PATTERNS).map((scaleName, idx) => (
            <MenuItem key={idx} value={scaleName}>
              {scaleName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display computed diatonic chords for the selected scale */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Chords in the Key of {rootNote} ({selectedScaleType})
      </Typography>
      <Stack direction="row" spacing={1} style={{ marginBottom: '20px' }}>
        {computedChords.map((compChord, idx) => (
          <Chip
            key={idx}
            label={`${compChord.degree}: ${compChord.chordName}`}
            onClick={() => handleComputedChordClick(compChord)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>

      {/* Fretboard showing chord fingering */}
      {chordData[selectedChord] && (
        <Fretboard
          chord={
            customFingering ||
            (chordData[selectedChord].positions
              ? chordData[selectedChord].positions[fingeringIndex]
              : chordData[selectedChord])
          }
          highlightNotes={computedScale}
        />
      )}

      {/* Chord details: clickable triads and variations */}
      {chordData[selectedChord] && (
        <ChordDetails
          chord={chordData[selectedChord]}
          onSelectFingering={handleTriadClick}
        />
      )}

      {/* Navigation for default chord positions */}
      {chordData[selectedChord] &&
        chordData[selectedChord].positions &&
        chordData[selectedChord].positions.length > 1 &&
        !customFingering && (
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
              disabled={fingeringIndex >= chordData[selectedChord].positions.length - 1}
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

      {/* Scale fretboard and key details */}
      <ScaleFretboard scaleNotes={computedScale} fretsToShow={24} />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Scale for {rootNote} ({selectedScaleType})
      </Typography>
      <KeyDetails keyData={{ notes: computedScale, type: selectedScaleType }} />

      {/* Tuner Modal */}
      <Modal
        open={showTuner}
        onClose={() => setShowTuner(false)}
        aria-labelledby="tuner-modal-title"
        aria-describedby="tuner-modal-description"
      >
        <Box sx={modalStyle}>
          <Tuner />
          <Button
            variant="contained"
            onClick={() => setShowTuner(false)}
            style={{ marginTop: '10px' }}
            fullWidth
          >
            Close Tuner
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for unavailable chord notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
