// src/components/ChordDetails.js
import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

const ChordDetails = ({ chord, onSelectFingering }) => {
  if (!chord) return null;
  return (
    <Card style={{ marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {chord.name}
        </Typography>
        <Typography variant="subtitle1">Triads:</Typography>
        <Stack direction="row" spacing={1} style={{ marginBottom: '10px' }}>
          {chord.triads.map((triad, idx) => (
            <Chip 
              key={idx} 
              label={triad.label} 
              onClick={() => onSelectFingering(triad.position)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>
        <Typography variant="subtitle1">Common Variations:</Typography>
        <Stack direction="row" spacing={1}>
          {chord.variations.map((variation, idx) => (
            <Chip 
              key={idx} 
              label={variation.label} 
              onClick={() => onSelectFingering(variation.position)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ChordDetails;
