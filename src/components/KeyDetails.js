// src/components/KeyDetails.js
import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

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
            <Chip key={idx} label={note} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default KeyDetails;
