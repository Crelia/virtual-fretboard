// src/ChordData.js

const chordData = {
  "A": {
    name: "A Major",
    positions: [
      {
        label: "Open",
        baseFret: 1,
        frets: ["x", "0", "2", "2", "2", "0"],
        fingers: [null, null, 1, 2, 3, null]
      },
      {
        label: "Moveable (5th Fret)",
        baseFret: 5,
        frets: ["5", "7", "7", "6", "5", "5"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 5, from: 0, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (9th Fret)",
        baseFret: 9,
        frets: ["9", "11", "11", "10", "9", "9"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 9, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (A-C#-E)",
        position: {
          baseFret: 1,
          frets: ["x", "0", "2", "x", "x", "x"],
          fingers: [null, null, 1, null, null, null]
        }
      },
      {
        label: "Triad (A-C#-E, Higher)",
        position: {
          // x x 7 6 5 x
          baseFret: 1,
          frets: ["x", "x", "7", "6", "5", "x"],
          fingers: [null, null, 3, 2, 1, null]
        }
      }
    ],
    variations: [
      {
        label: "Aadd9",
        position: {
          baseFret: 1,
          frets: ["x", "0", "2", "2", "2", "0"],
          fingers: [null, null, 1, 2, 3, null]
        }
      },
      {
        label: "A/E",
        position: {
          // 0 0 2 2 2 0
          baseFret: 1,
          frets: ["0", "0", "2", "2", "2", "0"],
          fingers: [null, null, 1, 2, 3, null]
        }
      },
      {
        label: "Asus2",
        position: {
          // x 0 2 2 0 0
          baseFret: 1,
          frets: ["x", "0", "2", "2", "0", "0"],
          fingers: [null, null, 1, 2, null, null]
        }
      },
      {
        label: "Asus4",
        position: {
          // x 0 2 2 3 0
          baseFret: 1,
          frets: ["x", "0", "2", "2", "3", "0"],
          fingers: [null, null, 1, 2, 3, null]
        }
      },
      {
        label: "A/G#",
        position: {
          // 4 0 2 2 2 0
          baseFret: 1,
          frets: ["4", "0", "2", "2", "2", "0"],
          fingers: [4, null, 1, 1, 1, null]
        }
      }
    ]
  },

  "Am": {
    name: "A Minor",
    positions: [
      {
        label: "Open",
        baseFret: 1,
        frets: ["x", "0", "2", "2", "1", "0"],
        fingers: [null, null, 2, 3, 1, null]
      },
      {
        label: "Moveable (5th Fret)",
        baseFret: 5,
        frets: ["5", "7", "7", "5", "5", "5"],
        fingers: [null, null, 3, null, 1, 1],
        barres: [{ fret: 5, from: 2, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (12th Fret)",
        baseFret: 12,
        frets: ["12", "14", "14", "12", "12", "12"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 12, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (A-C-E)",
        position: {
          baseFret: 1,
          frets: ["x", "0", "2", "x", "x", "x"],
          fingers: [null, null, 2, null, null, null]
        }
      },
      {
        label: "Triad (A-C-E, Higher)",
        position: {
          // x x 7 5 5 5
          baseFret: 1,
          frets: ["x", "x", "7", "5", "5", "5"],
          fingers: [null, null, 4, 1, 1, 1],
          barres: [{ fret: 5, from: 3, to: 5, finger: 1 }]
        }
      }
    ],
    variations: [
      {
        label: "Am7",
        position: {
          baseFret: 1,
          frets: ["x", "0", "2", "0", "1", "0"],
          fingers: [null, null, 2, null, 1, null]
        }
      },
      {
        label: "Am6",
        position: {
          // x 0 2 2 1 2
          baseFret: 1,
          frets: ["x", "0", "2", "2", "1", "2"],
          fingers: [null, null, 2, 3, 1, 4]
        }
      },
      {
        label: "Am/G",
        position: {
          // 3 0 2 2 1 0
          baseFret: 1,
          frets: ["3", "0", "2", "2", "1", "0"],
          fingers: [3, null, 2, 3, 1, null]
        }
      }
    ]
  },

  "Bb": {
    name: "Bb Major (Barre)",
    positions: [
      {
        label: "Barre (1st Fret)",
        baseFret: 1,
        frets: ["x", "1", "3", "3", "3", "1"],
        fingers: [null, 1, 3, 4, 2, 1],
        barres: [{ fret: 1, from: 1, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (6th Fret)",
        baseFret: 6,
        frets: ["6", "8", "8", "7", "6", "6"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 6, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (Bb-D-F)",
        position: {
          baseFret: 1,
          frets: ["x", "1", "x", "3", "x", "x"],
          fingers: [null, 1, null, 2, null, null]
        }
      },
      {
        label: "Triad (Bb-D-F, Higher)",
        position: {
          // x x 8 7 6 x
          baseFret: 1,
          frets: ["x", "x", "8", "7", "6", "x"],
          fingers: [null, null, 3, 2, 1, null]
        }
      }
    ],
    variations: [
      {
        label: "Bbmaj7",
        position: {
          baseFret: 1,
          frets: ["x", "1", "3", "2", "3", "1"],
          fingers: [null, 1, 3, 2, 4, 1]
        }
      },
      {
        label: "Bbsus4",
        position: {
          baseFret: 1,
          frets: ["x", "1", "3", "3", "3", "1"],
          fingers: [null, 1, 3, 4, 2, 1]
        }
      },
      {
        label: "Bb7",
        position: {
          // x 1 3 1 3 1
          baseFret: 1,
          frets: ["x", "1", "3", "1", "3", "1"],
          fingers: [null, 1, 3, 1, 4, 1],
          barres: [{ fret: 1, from: 1, to: 5, finger: 1 }]
        }
      }
    ]
  },

  "Bm": {
    name: "B Minor (Barre)",
    positions: [
      {
        label: "Barre (2nd Fret)",
        baseFret: 2,
        frets: ["x", "2", "4", "4", "3", "2"],
        fingers: [null, 1, 3, 4, 2, 1],
        barres: [{ fret: 2, from: 1, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (7th Fret)",
        baseFret: 7,
        frets: ["7", "9", "9", "7", "7", "7"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 7, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (B-D-F#)",
        position: {
          baseFret: 2,
          frets: ["x", "2", "x", "4", "x", "x"],
          fingers: [null, 1, null, 2, null, null]
        }
      },
      {
        label: "Triad (B-D-F#, Higher)",
        position: {
          // x x 9 7 7 7
          baseFret: 1,
          frets: ["x", "x", "9", "7", "7", "7"],
          fingers: [null, null, 4, 1, 1, 1],
          barres: [{ fret: 7, from: 3, to: 5, finger: 1 }]
        }
      }
    ],
    variations: [
      {
        label: "Bm7",
        position: {
          baseFret: 2,
          frets: ["x", "2", "4", "2", "3", "2"],
          fingers: [null, 1, 3, 1, 2, 1],
          barres: [{ fret: 2, from: 1, to: 5, finger: 1 }]
        }
      },
      {
        label: "Bm11",
        position: {
          baseFret: 2,
          frets: ["x", "2", "x", "2", "3", "2"],
          fingers: [null, 1, null, 1, 2, 1]
        }
      },
      {
        label: "Bm6",
        position: {
          // x 2 4 1 3 2
          baseFret: 1,
          frets: ["x", "2", "4", "1", "3", "2"],
          fingers: [null, 2, 4, 1, 3, 1],
          barres: [{ fret: 1, from: 3, to: 5, finger: 1 }]
        }
      }
    ]
  },

  "C": {
    name: "C Major",
    positions: [
      {
        label: "Open",
        baseFret: 1,
        frets: ["x", "3", "2", "0", "1", "0"],
        fingers: [null, 3, 2, null, 1, null]
      },
      {
        label: "Moveable (3rd Fret, A-shape)",
        baseFret: 3,
        frets: ["x", "3", "5", "5", "5", "3"],
        fingers: [null, 1, 3, 3, 3, 1],
        barres: [
          { fret: 3, from: 1, to: 5, finger: 1 },
          { fret: 5, from: 2, to: 4, finger: 3 }
        ]
      },
      {
        label: "Moveable (8th Fret, E-shape)",
        baseFret: 8,
        frets: ["8", "10", "10", "9", "8", "8"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 8, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (C-E-G)",
        position: {
          baseFret: 1,
          frets: ["x", "3", "2", "0", "x", "x"],
          fingers: [null, 3, 2, null, null, null]
        }
      },
      {
        label: "Triad (C-E-G, Higher)",
        position: {
          // x x 10 9 8 x
          baseFret: 1,
          frets: ["x", "x", "10", "9", "8", "x"],
          fingers: [null, null, 3, 2, 1, null]
        }
      }
    ],
    variations: [
      {
        label: "C/E",
        position: {
          baseFret: 1,
          frets: ["x", "3", "2", "0", "1", "0"],
          fingers: [null, 3, 2, null, 1, null]
        }
      },
      {
        label: "C/G",
        position: {
          baseFret: 1,
          frets: ["3", "3", "2", "0", "1", "0"],
          fingers: [2, 3, 2, null, 1, null]
        }
      },
      {
        label: "Cadd9",
        position: {
          baseFret: 1,
          frets: ["x", "3", "2", "0", "3", "0"],
          fingers: [null, 3, 2, null, 4, null]
        }
      },
      {
        label: "Cmaj7",
        position: {
          // x 3 2 0 0 0
          baseFret: 1,
          frets: ["x", "3", "2", "0", "0", "0"],
          fingers: [null, 3, 2, null, null, null]
        }
      },
      {
        label: "C7",
        position: {
          // x 3 2 3 1 0
          baseFret: 1,
          frets: ["x", "3", "2", "3", "1", "0"],
          fingers: [null, 3, 2, 4, 1, null]
        }
      }
    ]
  },

  "Cm": {
    name: "C Minor (Barre)",
    positions: [
      {
        label: "Barre (3rd Fret)",
        baseFret: 3,
        frets: ["x", "3", "5", "5", "4", "3"],
        fingers: [null, 1, 3, 4, 2, 1],
        barres: [{ fret: 3, from: 1, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (8th Fret)",
        baseFret: 8,
        frets: ["8", "10", "10", "8", "8", "8"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 8, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (C-Eb-G)",
        position: {
          baseFret: 3,
          frets: ["x", "3", "x", "5", "x", "x"],
          fingers: [null, 1, null, 2, null, null]
        }
      },
      {
        label: "Triad (C-Eb-G, Higher)",
        position: {
          // x x 10 8 8 8
          baseFret: 1,
          frets: ["x", "x", "10", "8", "8", "8"],
          fingers: [null, null, 3, 1, 1, 1],
          barres: [{ fret: 8, from: 3, to: 5, finger: 1 }]
        }
      }
    ],
    variations: [
      {
        label: "Cm7",
        position: {
          baseFret: 3,
          frets: ["x", "3", "5", "3", "4", "3"],
          fingers: [null, 1, 3, 1, 2, 1]
        }
      },
      {
        label: "Cm6",
        position: {
          baseFret: 3,
          frets: ["x", "3", "5", "5", "3", "3"],
          fingers: [null, 1, 3, 4, 1, 1],
          barres: [{ fret: 3, from: 1, to: 5, finger: 1 }]
        }
      },
      {
        label: "Cm9",
        position: {
          // x 3 1 3 3 3
          baseFret: 1,
          frets: ["x", "3", "1", "3", "3", "3"],
          fingers: [null, 3, 1, 4, 4, 4],
          barres: [{ fret: 3, from: 3, to: 5, finger: 4 }]
        }
      }
    ]
  },

  "D": {
    name: "D Major",
    positions: [
      {
        label: "Open",
        baseFret: 1,
        frets: ["x", "x", "0", "2", "3", "2"],
        fingers: [null, null, null, 1, 3, 2]
      },
      {
        label: "Moveable (5th Fret, A-shape)",
        baseFret: 5,
        frets: ["x", "5", "7", "7", "7", "5"],
        fingers: [null, 1, 3, 3, 3, 1],
        barres: [
          { fret: 5, from: 1, to: 5, finger: 1 },
          { fret: 7, from: 2, to: 4, finger: 3 }
        ]
      },
      {
        label: "Moveable (10th Fret, E-shape)",
        baseFret: 10,
        frets: ["10", "12", "12", "11", "10", "10"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 10, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (D-F#-A)",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "3", "x"],
          fingers: [null, null, null, 1, 2, null]
        }
      },
      {
        label: "Triad (D-F#-A, Higher)",
        position: {
          // x x 7 7 7 10 (or simpler shape shown below)
          baseFret: 1,
          frets: ["x", "x", "7", "7", "7", "5"],
          fingers: [null, null, 1, 1, 1, 1],
          barres: [
            { fret: 7, from: 2, to: 4, finger: 1 },
            { fret: 5, from: 5, to: 5, finger: 1 }
          ]
        }
      }
    ],
    variations: [
      {
        label: "D/F#",
        position: {
          baseFret: 1,
          frets: ["2", "x", "0", "2", "3", "2"],
          fingers: [2, null, null, 1, 3, 1]
        }
      },
      {
        label: "D/A",
        position: {
          baseFret: 1,
          frets: ["x", "0", "0", "2", "3", "2"],
          fingers: [null, null, null, 1, 3, 2]
        }
      },
      {
        label: "Dsus2",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "3", "0"],
          fingers: [null, null, null, 1, 2, null]
        }
      },
      {
        label: "Dsus4",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "3", "3"],
          fingers: [null, null, null, 1, 2, 3]
        }
      },
      {
        label: "D7",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "1", "2"],
          fingers: [null, null, null, 2, 1, 3]
        }
      },
      {
        label: "Dmaj7",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "2", "2"],
          fingers: [null, null, null, 1, 1, 1],
          barres: [{ fret: 2, from: 3, to: 5, finger: 1 }]
        }
      },
      {
        label: "Dadd9",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "3", "0"],
          fingers: [null, null, null, 1, 2, null]
        }
      }
    ]
  },

  "Dm": {
    name: "D Minor",
    positions: [
      {
        label: "Open",
        baseFret: 1,
        frets: ["x", "x", "0", "2", "3", "1"],
        fingers: [null, null, null, 2, 3, 1]
      },
      {
        label: "Moveable (5th Fret, A-shape)",
        baseFret: 5,
        frets: ["x", "5", "7", "7", "6", "5"],
        fingers: [null, 1, 3, 4, 2, 1],
        barres: [{ fret: 5, from: 1, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (10th Fret, E-shape)",
        baseFret: 10,
        frets: ["10", "12", "12", "10", "10", "10"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 10, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (D-F-A)",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "3", "x"],
          fingers: [null, null, null, 1, 2, null]
        }
      },
      {
        label: "Triad (D-F-A, Higher)",
        position: {
          // G string=7 (D), B=6 (F), E=5 (A)
          baseFret: 1,
          frets: ["x", "x", "7", "6", "5", "x"],
          fingers: [null, null, 3, 2, 1, null]
        }
      }
    ],
    variations: [
      {
        label: "Dm/A",
        position: {
          // A in the bass
          baseFret: 1,
          frets: ["x", "0", "0", "2", "3", "1"],
          fingers: [null, null, null, 2, 3, 1]
        }
      },
      {
        label: "Dm/F",
        position: {
          // F in the bass
          baseFret: 1,
          frets: ["1", "x", "0", "2", "3", "1"],
          fingers: [1, null, null, 3, 4, 1],
          // If you'd like a partial barre on fret 1 (strings 1 & 6), specify:
          // barres: [{ fret: 1, from: 0, to: 0, finger: 1 }]
        }
      },
      {
        label: "Dm7",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "1", "1"],
          fingers: [null, null, null, 2, 1, 1],
          barres: [{ fret: 1, from: 4, to: 5, finger: 1 }]
        }
      },
      {
        label: "Dm6",
        position: {
          baseFret: 1,
          frets: ["x", "x", "0", "2", "0", "1"],
          fingers: [null, null, null, 2, null, 1]
        }
      }
    ]
  },
  
  "E": {
    name: "E Major",
    positions: [
      {
        label: "Open",
        baseFret: 1,
        frets: ["0", "2", "2", "1", "0", "0"],
        fingers: [null, 2, 3, 1, null, null]
      },
      {
        label: "Moveable (7th Fret, Barre)",
        baseFret: 7,
        frets: ["7", "9", "9", "8", "7", "7"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 7, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (E-G#-B)",
        position: {
          baseFret: 1,
          frets: ["0", "x", "2", "x", "x", "x"],
          fingers: [null, null, 1, null, null, null]
        }
      },
      {
        label: "Triad (E-G#-B, Higher)",
        position: {
          // x x 9 9 9 x
          baseFret: 1,
          frets: ["x", "x", "9", "9", "9", "x"],
          fingers: [null, null, 1, 1, 1, null],
          barres: [{ fret: 9, from: 2, to: 4, finger: 1 }]
        }
      }
    ],
    variations: [
      {
        label: "Esus4",
        position: {
          baseFret: 1,
          frets: ["0", "2", "2", "2", "0", "0"],
          fingers: [null, 2, 3, 4, null, null]
        }
      },
      {
        label: "Eadd9",
        position: {
          baseFret: 1,
          frets: ["0", "2", "2", "1", "2", "0"],
          fingers: [null, 2, 3, 1, 4, null]
        }
      },
      {
        label: "E7",
        position: {
          // 0 2 0 1 0 0
          baseFret: 1,
          frets: ["0", "2", "0", "1", "0", "0"],
          fingers: [null, 2, null, 1, null, null]
        }
      }
    ]
  },

  "Em": {
    name: "E Minor",
    positions: [
      {
        label: "Open",
        baseFret: 1,
        frets: ["0", "2", "2", "0", "0", "0"],
        fingers: [null, 2, 3, null, null, null]
      },
      {
        label: "Moveable (7th Fret, Barre)",
        baseFret: 7,
        frets: ["7", "9", "9", "7", "7", "7"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 7, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (E-G-B)",
        position: {
          baseFret: 1,
          frets: ["0", "x", "2", "x", "x", "x"],
          fingers: [null, null, 2, null, null, null]
        }
      },
      {
        label: "Triad (E-G-B, Higher)",
        position: {
          // x x 9 8 7 x
          baseFret: 1,
          frets: ["x", "x", "9", "8", "7", "x"],
          fingers: [null, null, 3, 2, 1, null]
        }
      }
    ],
    variations: [
      {
        label: "Em7",
        position: {
          baseFret: 1,
          frets: ["0", "2", "2", "0", "3", "0"],
          fingers: [null, 2, 3, null, 4, null]
        }
      },
      {
        label: "Em6",
        position: {
          // 0 2 2 0 2 0
          baseFret: 1,
          frets: ["0", "2", "2", "0", "2", "0"],
          fingers: [null, 2, 3, null, 4, null]
        }
      }
    ]
  },

  "F": {
    name: "F Major (Barre)",
    positions: [
      {
        label: "Barre (1st Fret)",
        baseFret: 1,
        frets: ["1", "3", "3", "2", "1", "1"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 1, from: 0, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (8th Fret)",
        baseFret: 8,
        frets: ["8", "10", "10", "9", "8", "8"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 8, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (F-A-C)",
        position: {
          baseFret: 1,
          frets: ["x", "3", "x", "2", "1", "x"],
          fingers: [null, 3, null, 2, 1, null]
        }
      },
      {
        label: "Triad (F-A-C, Higher)",
        position: {
          // x x 10 10 10 x
          baseFret: 1,
          frets: ["x", "x", "10", "10", "10", "x"],
          fingers: [null, null, 1, 1, 1, null],
          barres: [{ fret: 10, from: 2, to: 4, finger: 1 }]
        }
      }
    ],
    variations: [
      {
        label: "Fmaj7",
        position: {
          baseFret: 1,
          frets: ["1", "3", "3", "2", "1", "0"],
          fingers: [1, 3, 4, 2, 1, null],
          barres: [{ fret: 1, from: 0, to: 4, finger: 1 }]
        }
      },
      {
        label: "Fsus2",
        position: {
          baseFret: 1,
          frets: ["1", "x", "3", "3", "1", "1"],
          fingers: [1, null, 3, 4, 1, 1],
          barres: [{ fret: 1, from: 4, to: 5, finger: 1 }]
        }
      },
      {
        label: "F/A",
        position: {
          // x 0 3 2 1 1
          baseFret: 1,
          frets: ["x", "0", "3", "2", "1", "1"],
          fingers: [null, null, 3, 2, 1, 1],
          barres: [{ fret: 1, from: 4, to: 5, finger: 1 }]
        }
      }
    ]
  },

  "Fm": {
    name: "F Minor",
    positions: [
      {
        // Standard barre at 1st fret (E-shape)
        label: "Barre (1st Fret)",
        baseFret: 1,
        frets: ["1", "3", "3", "1", "1", "1"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 1, from: 0, to: 5, finger: 1 }]
      },
      {
        // Moveable barre at the 8th fret
        label: "Moveable (8th Fret)",
        baseFret: 8,
        frets: ["8", "10", "10", "8", "8", "8"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 8, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        // Lower triad on D/G/B strings
        label: "Triad (F-Ab-C)",
        position: {
          baseFret: 1,
          frets: ["x", "x", "3", "1", "1", "x"], 
          fingers: [null, null, 3, 1, 1, null],
          barres: [{ fret: 1, from: 3, to: 4, finger: 1 }] 
          // Barring G (3rd string) & B (4th string) at fret 1
        }
      },
      {
        // Higher triad on G/B/e strings
        label: "Triad (F-Ab-C, Higher)",
        position: {
          baseFret: 8,
          frets: ["x", "x", "x", "10", "9", "8"],
          fingers: [null, null, null, 3, 2, 1]
        }
      }
    ],
    variations: [
      {
        // F Minor 7 at the 1st fret
        label: "Fm7",
        position: {
          baseFret: 1,
          frets: ["1", "3", "1", "1", "1", "1"],
          fingers: [1, 3, 1, 1, 1, 1],
          barres: [{ fret: 1, from: 0, to: 5, finger: 1 }]
        }
      },
      {
        // F Minor 6 at the 1st fret
        label: "Fm6",
        position: {
          baseFret: 1,
          frets: ["1", "3", "3", "1", "3", "1"],
          fingers: [1, 3, 4, 1, 2, 1],
          barres: [{ fret: 1, from: 0, to: 5, finger: 1 }]
        }
      }
    ]
  },
  
  "G": {
    name: "G Major",
    positions: [
      {
        label: "Open",
        baseFret: 1,
        frets: ["3", "2", "0", "0", "0", "3"],
        fingers: [2, 1, null, null, null, 3]
      },
      {
        label: "Moveable (3rd Fret, Barre)",
        baseFret: 3,
        frets: ["3", "5", "5", "4", "3", "3"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 3, from: 0, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (10th Fret)",
        baseFret: 10,
        frets: ["10", "12", "12", "11", "10", "10"],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [{ fret: 10, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (G-B-D)",
        position: {
          baseFret: 1,
          frets: ["3", "x", "x", "0", "x", "x"],
          fingers: [1, null, null, 2, null, null]
        }
      },
      {
        label: "Triad (G-B-D, Higher)",
        position: {
          // x x 5 4 3 x
          baseFret: 1,
          frets: ["x", "x", "5", "4", "3", "x"],
          fingers: [null, null, 3, 2, 1, null]
        }
      }
    ],
    variations: [
      {
        label: "G/B",
        position: {
          baseFret: 1,
          frets: ["x", "2", "0", "0", "0", "3"],
          fingers: [null, 1, null, null, null, 2]
        }
      },
      {
        label: "Gsus4",
        position: {
          baseFret: 1,
          frets: ["3", "2", "0", "0", "1", "3"],
          fingers: [2, 1, null, null, 3, 4]
        }
      },
      {
        label: "Gadd9",
        position: {
          baseFret: 1,
          frets: ["3", "2", "0", "0", "0", "2"],
          fingers: [2, 1, null, null, null, 3]
        }
      },
      {
        label: "G/F#",
        position: {
          // 2 x 0 0 0 3
          baseFret: 1,
          frets: ["2", "x", "0", "0", "0", "3"],
          fingers: [1, null, null, null, null, 3]
        }
      },
      {
        label: "G7",
        position: {
          // 3 2 0 0 0 1
          baseFret: 1,
          frets: ["3", "2", "0", "0", "0", "1"],
          fingers: [3, 2, null, null, null, 1]
        }
      }
    ]
  },

  "Gm": {
    name: "G Minor",
    positions: [
      {
        label: "Barre (3rd Fret, E-shape)",
        baseFret: 3,
        frets: ["3", "5", "5", "3", "3", "3"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 3, from: 0, to: 5, finger: 1 }]
      },
      {
        label: "Moveable (10th Fret)",
        baseFret: 10,
        frets: ["10", "12", "12", "10", "10", "10"],
        fingers: [1, 3, 4, 1, 1, 1],
        barres: [{ fret: 10, from: 0, to: 5, finger: 1 }]
      }
    ],
    triads: [
      {
        label: "Triad (G-Bb-D, Lower)",
        position: {
          // Using D/G/B strings: x x 5 3 3 3
          baseFret: 3,
          frets: ["x", "x", "5", "3", "3", "3"],
          fingers: [null, null, 3, 1, 1, 1],
          barres: [{ fret: 3, from: 3, to: 5, finger: 1 }]
        }
      },
      {
        label: "Triad (G-Bb-D, Higher)",
        position: {
          // x x 10 8 8 8
          baseFret: 1,
          frets: ["x", "x", "10", "8", "8", "8"],
          fingers: [null, null, 3, 1, 1, 1],
          barres: [{ fret: 8, from: 3, to: 5, finger: 1 }]
        }
      }
    ],
    variations: [
      {
        label: "Gm7",
        position: {
          // 3 5 3 3 3 3
          baseFret: 3,
          frets: ["3", "5", "3", "3", "3", "3"],
          fingers: [1, 3, 1, 1, 1, 1],
          barres: [{ fret: 3, from: 0, to: 5, finger: 1 }]
        }
      },
      {
        label: "Gm6",
        position: {
          // 3 5 5 3 5 3
          baseFret: 3,
          frets: ["3", "5", "5", "3", "5", "3"],
          fingers: [1, 3, 4, 1, 2, 1],
          barres: [{ fret: 3, from: 0, to: 5, finger: 1 }]
        }
      },
      {
        label: "Gm9",
        position: {
          // 3 5 3 3 3 5
          baseFret: 3,
          frets: ["3", "5", "3", "3", "3", "5"],
          fingers: [1, 3, 1, 1, 1, 4],
          barres: [{ fret: 3, from: 0, to: 4, finger: 1 }]
        }
      }
    ]
  }  
};

export default chordData;
