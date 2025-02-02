// src/components/ChordSelector.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ChordSelector = ({ chords, selectedChord, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
      <InputLabel id="chord-select-label">Select Chord</InputLabel>
      <Select
        labelId="chord-select-label"
        value={selectedChord}
        onChange={(e) => onChange(e.target.value)}
        label="Select Chord"
      >
        {chords.map((chord) => (
          <MenuItem key={chord} value={chord}>
            {chord}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChordSelector;
