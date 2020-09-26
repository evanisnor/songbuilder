import Progression from './Progression.js';
import { NotesArray } from './Note.js';

/**
 * Define a type of scale from the 12 notes by specifying a pattern of intervals between each note.
 */
class ScalePattern {
    constructor(name, intervals) {
        this.name = name;
        this.intervals = intervals;
    }
}

/**
 * Represents a set of notes that can be arranged into a progression, or shifted by a mode.
 */
class Scale {
    constructor(name, notes, parent) {
        this.name = name;
        this.notes = notes;
        this.parent = parent
    }

    get tonic () {
        return this.notes[0];
    }

    progression(...args) {
        const chords = []
        for (let i = 0; i < args.length; i++) {
            const degree = args[i];
            const tonic = this.notes[degree.index]
            const chord = degree.chord(tonic)
            chords.push(chord)
        }
        return new Progression(args, chords, this);
    }

    applyMode(mode) {
        const modifiedNotes = []
        for (let i = mode.offset; i < this.notes.length + mode.offset; i++) {
            const note = this.notes[i % this.notes.length];
            modifiedNotes.push(note)
        }

        return new Scale(mode.name, modifiedNotes, this)
    }

    toString() {
        return `${this.tonic} ${this.name} | ${this.notes.join(' ')}`
    }
}


const ScalePatterns = {
    Major: new ScalePattern('Major', [ 2, 2, 1, 2, 2, 2, 1 ]),
    HarmonicMinor: new ScalePattern('Harmonic Minor', [ 2, 1, 2, 2, 1, 3, 1 ]),
    MelodicMinor: new ScalePattern('Melodic Minor', [ 2, 1, 2, 2, 2, 2, 1 ]),
    MajorPentatonic: new ScalePattern('Major Pentatonic', [ 2, 2, 3, 2, 3 ]),
    MinorPentatonic: new ScalePattern('Minor Pentatonic', [ 3, 2, 2, 3, 2 ]),
    MajorPentatonicBlues: new ScalePattern('Major Pentatonic Blues', [ 2, 1, 1, 3, 2, 3 ]),
    MinorPentatonicBlues: new ScalePattern('Minor Pentatonic Blues', [ 3, 2, 1, 1, 3, 2 ])
}

// Generate all of the scales
const Scales = {}

for (const i in ScalePatterns) {
    if (ScalePatterns.hasOwnProperty(i)) {
        const pattern = ScalePatterns[i];
        
        for (let n = 0; n < NotesArray.length; n++) {
            const tonic = NotesArray[n];
            const notes = [ tonic ];

            var totalSteps = 0;
            pattern.intervals.forEach(interval => {
                totalSteps += interval;
                notes.push(NotesArray[(tonic.tone + totalSteps) % NotesArray.length]);
            });

            const label = `${tonic.codeFriendlyLabel}${pattern.name.split(' ').join('')}`;
            Scales[label] = new Scale(pattern.name, notes);
        }
    }
}


export default Scales;