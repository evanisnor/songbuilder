

/*
    Notes						

    Chromatic Ascending		A	A♯	B	C	C♯	D	D♯	E	F	F♯	G	G♯
    Chromatic Descending	A	B♭	B	C	D♭	D	E♭	E	F	G♭	G	A♭
*/

const notesAscending = [
    'A', 'Asharp', 'B', 'C', 'Csharp', 'D', 'Dsharp', 'E', 'F', 'Fsharp', 'G', 'Gsharp'
]
const notesDecending = [
    'A', 'Bflat', 'B', 'C', 'Dflat', 'D', 'Eflat', 'E', 'F', 'Gflat', 'G', 'Aflat'
]


/*
    Mode by Semitone Intervals
    Lydian			2	2	2	1	2	2	1
    Ionian 			2	2	1	2	2	2	1
    Mixolydian		2	2	1	2	2	1	2
    Dorian			2	1	2	2	2	1	2
    Aeolian			2	1	2	2	1	2	2
    Harmonic Minor	2	1	2	2	1	3	1
    Melodic Minor	2	1	2	2	2	2	1
    Phrygian		1	2	2	2	1	2	2
    Locrian			1	2	2	1	2	2	2
*/
const modes = {
    Lydian:         [ 2, 2, 2, 1, 2, 2, 1 ],
    Ionian:         [ 2, 2, 1, 2, 2, 2, 1 ],
    Mixolydian:     [ 2, 2, 1, 2, 2, 1, 2 ],
    Dorian:         [ 2, 1, 2, 2, 2, 1, 2 ],
    Aeolian:        [ 2, 1, 2, 2, 1, 2, 2 ],
    HarmonicMinor:  [ 2, 1, 2, 2, 1, 3, 1 ],
    MelodicMinor:   [ 2, 1, 2, 2, 2, 2, 1 ],
    Phrygian:       [ 1, 2, 2, 2, 1, 2, 2 ],
    Locrian:        [ 1, 2, 2, 1, 2, 2, 2 ]
}

/*
    Chord
*/
class Chord {
    constructor(symbol, semitones) {
        this.symbol = symbol;
        this.semitones = semitones;
    }

    fromNote(note) {
        return note + this.symbol
    }
}

const chords = {
    major: new Chord('', [4, 7]),
    minor: new Chord('m', [3, 7]),
    augmented: new Chord ('aug', [4, 4]),
    diminished: new Chord ('dim', [3, 3]),
    sus2: new Chord('sus2', [2, 5]),
    sus4: new Chord('sus4', [5, 2]),
    major7th: new Chord('maj7', [4, 3, 4]),
    minor7th: new Chord('m7', [3, 4, 3]),
    dominant7th: new Chord('7', [4, 3, 3]),
    diminished7th: new Chord('dim7', [3, 3, 3]),
    majorSixth: new Chord("6", [4, 3, 2]),
    minorSixth: new Chord("m6", [3, 4, 2])
}

const majorChordProg = [
    chords.major, // I
    chords.minor, // ii
    chords.minor, // iii
    chords.major, // IV
    chords.major, // V
    chords.minor, // vi
    chords.diminished // vii(dim)
]

const minorChordProg = [
    chords.minor, // i
    chords.diminished, // ii(dim)
    chords.major, // III
    chords.minor, // iv
    chords.minor, // v
    chords.major, // VI
    chords.major // VII
]


/*
    Degrees

    I	Tonic
    ii	Supertonic
    iii	Mediant
    IV	Subdominant
    V	Dominant
    vi	Submediant
    vii(dim)	Subtonic (in the natural minor scale)
                Leading tone (in the major scale)
    1	Tonic (octave)
*/
class Degree {
    constructor(index, symbol) {
        this.index = index;
        this.symbol = symbol;
    }

    adjustedSymbol(scale) {
        switch (scale) {
            // Major
            case modes.Lydian:
            case modes.Ionian:
            case modes.Mixolydian:
                return this.symbol

            // Minor
            case modes.Dorian:
            case modes.Aeolian:
            case modes.Phrygian:
            case modes.Locrian:
                return this.symbol.toLowerCase()
        }
    }

    chord(scale, note) {
        switch (scale) {
            // Major
            case modes.Lydian:
            case modes.Ionian:
            case modes.Mixolydian:
                return majorChordProg[this.index].fromNote(note);

            // Minor
            case modes.Dorian:
            case modes.Aeolian:
            case modes.Phrygian:
            case modes.Locrian:
                return minorChordProg[this.index].fromNote(note);
        }
    }
}

const I = new Degree(0, 'I');
const II = new Degree(1, 'II');
const III = new Degree(2, 'III');
const IV = new Degree(3, 'IV');
const V = new Degree(4, 'V');
const VI = new Degree(5, 'VI');
const VII = new Degree(6, 'VII');

// Logic

const generateScales = function() {
    var scales = {}

    notesAscending.forEach(function (tonic, rootIndex) {
        for (const mode in modes) {
            const intervals = modes[mode]
            var notes = [ tonic ];
            if (!scales.hasOwnProperty(mode)) {
                scales[mode] = {}
            }

            var totalInterval = 0;
            intervals.forEach(interval => {
                totalInterval += interval
                notes.push(notesAscending[(rootIndex + totalInterval) % notesAscending.length]);
            })

            scales[mode][tonic] = notes
        }
    });

    return scales;
};

const generateChordProgression = function(scale, notes, degrees) {
    var degreeSymbols = []
    degrees.forEach(degree => {
        degreeSymbols.push(degree.adjustedSymbol(scale))
    });
    console.log(`Building progression ${degreeSymbols} from notes ${notes} `)
    
    var progression = [];
    degrees.forEach(degree => {
        const chord = degree.chord(scale, notes[degree.index])
        progression.push(chord)
    })

    return progression
}


// Run

var scales = generateScales()
console.log(generateChordProgression(modes.Ionian, scales.Ionian.G, [ I, IV, V, VII ]))
console.log(generateChordProgression(modes.Aeolian, scales.Aeolian.A, [ I, VI, VII, V, IV ]))
console.log(generateChordProgression(modes.Phrygian, scales.Phrygian.A, [ I, VI, V, IV ]))
console.log(generateChordProgression(modes.Mixolydian, scales.Mixolydian.A, [ I, VI, V, IV ]))



