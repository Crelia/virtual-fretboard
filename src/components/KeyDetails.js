// src/components/KeyDetails.js
import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

// Define the same noteColors mapping as in ScaleFretboard.
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

const KeyDetails = ({ keyData }) => {
  if (!keyData) return null;
  
  const { type, notes } = keyData;
  
  return (
    <Card style={{ marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {type === 'major' ? 'Major Scale' : 'Minor Scale'}
        </Typography>
        <Stack direction="row" spacing={1}>
          {notes.map((note, idx) => (
            <Chip 
              key={idx} 
              label={note} 
              style={{
                backgroundColor: noteColors[note] || "lightgray",
                color: 'black'
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default KeyDetails;
