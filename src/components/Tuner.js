// src/components/Tuner.js
import React, { useEffect, useState, useRef } from 'react';

// Helper: Convert frequency (Hz) to the nearest musical note.
function frequencyToNote(freq) {
  if (freq <= 0) return { note: '', cents: 0 };

  const noteNum = 12 * (Math.log2(freq / 440)) + 69;
  const roundedNoteNum = Math.round(noteNum);
  const cents = Math.floor((noteNum - roundedNoteNum) * 100);

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteName = noteNames[roundedNoteNum % 12];
  const octave = Math.floor(roundedNoteNum / 12) - 1;

  return { note: `${noteName}${octave}`, cents };
}

// Autocorrelation algorithm for pitch detection.
function autoCorrelate(buffer, sampleRate) {
  let SIZE = buffer.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) {
    let val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;

  let r1 = 0, r2 = SIZE - 1;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < 0.2) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < 0.2) {
      r2 = SIZE - i;
      break;
    }
  }
  buffer = buffer.slice(r1, r2);
  SIZE = buffer.length;

  const correlations = new Array(SIZE).fill(0);
  for (let lag = 0; lag < SIZE; lag++) {
    let sum = 0;
    for (let i = 0; i < SIZE - lag; i++) {
      sum += buffer[i] * buffer[i + lag];
    }
    correlations[lag] = sum;
  }

  let d = 0;
  while (correlations[d] > correlations[d + 1]) {
    d++;
  }
  let maxval = -1, maxpos = -1;
  for (let i = d; i < SIZE; i++) {
    if (correlations[i] > maxval) {
      maxval = correlations[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;
  if (T0 === 0) return -1;
  return sampleRate / T0;
}

const Tuner = () => {
  const [frequency, setFrequency] = useState(0);
  const [note, setNote] = useState('');
  const [cents, setCents] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const startTuner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        const bufferLength = analyserRef.current.fftSize;
        dataArrayRef.current = new Float32Array(bufferLength);
        source.connect(analyserRef.current);
        updatePitch();
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    const updatePitch = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);
      const sampleRate = audioContextRef.current.sampleRate;
      const freq = autoCorrelate(dataArrayRef.current, sampleRate);
      if (freq !== -1) {
        setFrequency(freq);
        const { note, cents } = frequencyToNote(freq);
        setNote(note);
        setCents(cents);
      } else {
        setFrequency(0);
        setNote('');
        setCents(0);
      }
      rafIdRef.current = requestAnimationFrame(updatePitch);
    };

    startTuner();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Determine if a valid note is being detected.
  const isActive = note !== '';

  // Prepare the cents offset text and arrow indicator.
  let offsetText = 'Waiting...';
  if (isActive) {
    if (cents === 0) {
      offsetText = 'In Tune';
    } else if (cents < 0) {
      offsetText = `${Math.abs(cents)} cents flat ←`;
    } else {
      offsetText = `${cents} cents sharp →`;
    }
  }

  // Compact card styles.
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    color: '#333',
    padding: '20px'
  };

  const cardStyle = {
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center'
  };

  const headerStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px'
  };

  const noteStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '10px 0'
  };

  const offsetTextStyle = {
    fontSize: '1.2rem',
    margin: '5px 0',
    color: isActive ? '#333' : '#aaa'
  };

  // Tuning slider dimensions.
  const sliderWidth = 250; // in pixels
  const sliderHeight = 8;
  const maxCents = 50; // assume max deviation is ±50 cents
  const scaleFactor = (sliderWidth / 2) / maxCents; // e.g. 75/50 = 1.5 px per cent
  // Clamp the marker so that it doesn't move out of the slider.
  const clampedCents = Math.max(-maxCents, Math.min(cents, maxCents));
  const markerOffset = isActive ? clampedCents * scaleFactor : 0;

  // When active, use a gradient to indicate flat/in-tune/sharp; else use a neutral background.
  const sliderBackground = isActive
    ? 'linear-gradient(to right, #3498db, #2ecc71, #e74c3c)'
    : '#eee';

  const sliderContainerStyle = {
    marginTop: '20px',
    width: `${sliderWidth}px`,
    position: 'relative',
    height: `${sliderHeight}px`,
    background: sliderBackground,
    borderRadius: `${sliderHeight / 2}px`
  };

  // Marker style: red when active, grey when inactive.
  const markerStyle = {
    position: 'absolute',
    top: '-6px',
    left: `calc(50% + ${markerOffset}px)`,
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: isActive ? '#e74c3c' : '#aaa',
    transition: 'left 0.1s ease-out'
  };

  const labelContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    marginTop: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Tune Up!</h2>
        <div style={noteStyle}>{isActive ? note : '--'}</div>
        <div style={offsetTextStyle}>{offsetText}</div>
        {/* Tuning slider */}
        <div style={sliderContainerStyle}>
          <div style={markerStyle}></div>
        </div>
        <div style={labelContainerStyle}>
          <span>FLAT</span>
          <span>IN TUNE</span>
          <span>SHARP</span>
        </div>
      </div>
    </div>
  );
};

export default Tuner;
