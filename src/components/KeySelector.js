// src/components/KeySelector.js

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const KeySelector = ({ keyList, selectedKey, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
      <InputLabel id="key-select-label">Select Key</InputLabel>
      <Select
        labelId="key-select-label"
        value={selectedKey}
        onChange={(e) => onChange(e.target.value)}
        label="Select Key"
      >
        {keyList.map((k) => (
          <MenuItem key={k} value={k}>
            {k}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default KeySelector;
