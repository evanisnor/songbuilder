
class Note {
    constructor(tone, labelAscending, labelDescending) {
        this.tone = tone;
        this.labelAscending = labelAscending;
        this.labelDescending = labelDescending;
    }

    label(direction) {
        switch(direction) {
            default:
            case 'ascending':
                return this.labelAscending;
            case 'descending':
                return this.labelDescending;
        }
    }

    toString() {
        if (this.labelAscending == this.labelDescending) {
            return this.labelAscending;
        } else {
            return `${this.labelAscending}/${this.labelDescending}`
        }
    }
}

const Notes = {
    A:      new Note(0, 'A', 'A'),
    Asharp: new Note(1, 'A♯', 'B♭'),
    B:      new Note(2, 'B', 'B'),
    C:      new Note(3, 'C', 'C'),
    Csharp: new Note(4, 'C♯', 'D♭'),
    D:      new Note(5, 'D', 'D'),
    Dsharp: new Note(6, 'D♯', 'E♭'),
    E:      new Note(7, 'E', 'E'),
    F:      new Note(8, 'F', 'F'),
    Fsharp: new Note(9, 'F♯', 'G♭'),
    G:      new Note(10, 'G', 'G'),
    Gsharp: new Note(11, 'G♯', 'A♭'),
}

const NotesArray = Object.values(Notes)

const A = Notes.A;
const Asharp = Notes.Asharp;
const B = Notes.B;
const C = Notes.C;
const Csharp = Notes.Csharp;
const D = Notes.D;
const Dsharp = Notes.Dsharp;
const E = Notes.E;
const F = Notes.F;
const Fsharp = Notes.Fsharp;
const G = Notes.G;
const Gsharp = Notes.Gsharp;

class Mode {

    constructor(name, offset) {
        this.name = name;
        this.offset = offset;
    }

    toString() {
        return `Mode[name=${this.name}, offset=${this.offset}]`
    }
}

/*
    0 Ionian
    1 Dorian
    2 Phyrgian
    3 Lydian
    4 Mixolydian
    5 Aeolian
    6 Locrian
 */
const Modes = {
    Lydian:         new Mode('Lydian', 3),
    Ionian:         new Mode('Ionian', 0),
    Mixolydian:     new Mode('Mixolydian', 4),
    Dorian:         new Mode('Dorian', 1),
    Aeolian:        new Mode('Aeolian', 5),
    Phrygian:       new Mode('Phrygian', 2),
    Locrian:        new Mode('Locrian', 6)
}


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
            const chord = degree.chord(this.notes[degree.index])
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

const Scales = {
    AMajor: new Scale('Major', [ A, B, Csharp, D, E, Fsharp, Gsharp ]),
    ASharpMajor: new Scale('Major', [ Asharp, C, D, Dsharp, F, G, A ]),
    BFlatMajor: new Scale('Major', [ Asharp, C, D, Dsharp, F, G, A ]),
    BMajor: new Scale('Major', [ B, Csharp, Dsharp, E, Fsharp, Gsharp, Asharp ]),
    CMajor: new Scale('Major', [ C, D, E, F, G, A, B ]),
    CSharpMajor: new Scale('Major', [ Csharp, Dsharp, F, Fsharp, Gsharp, Asharp, C ]),
    DFlatMajor: new Scale('Major', [ Csharp, Dsharp, F, Fsharp, Gsharp, Asharp, C ]),
    DMajor: new Scale('Major', [ D, E, Fsharp, G, A, B, Csharp ]),
    DSharpMajor: new Scale('Major', [ D, E, Fsharp, G, A, B, Csharp ]),
    EFlatMajor: new Scale('Major', [ D, E, Fsharp, G, A, B, Csharp ]),
    EMajor: new Scale('Major', [ E, Fsharp, Gsharp, A, B, Csharp, Dsharp ]),
    FMajor: new Scale('Major', [ F, G, A, Asharp, C, D, E ]),
    FSharpMajor: new Scale('Major', [ Fsharp, Gsharp, Asharp, B, Csharp, Dsharp, F ]),
    GFlatMajor: new Scale('Major', [ Fsharp, Gsharp, Asharp, B, Csharp, Dsharp, F ]),
    GMajor: new Scale('Major', [ G, A, B, C, D, E, Fsharp ]),
    GSharpMajor: new Scale('Major', [ Gsharp, Asharp, C, Csharp, Dsharp, F, G ]),
    AFlatMajor: new Scale('Major', [ Gsharp, Asharp, C, Csharp, Dsharp, F, G ])
}

class ChordType {
    constructor(symbol, semitones) {
        this.symbol = symbol;
        this.semitones = semitones;
    }
}

const ChordTypes = {
    Major: new ChordType('', [4, 7]),
    Minor: new ChordType('m', [3, 7]),
    Augmented: new ChordType ('aug', [4, 8]),
    Diminished: new ChordType ('dim', [3, 6]),
    Sus2: new ChordType('sus2', [2, 7]),
    Sus4: new ChordType('sus4', [5, 7]),
    Major7th: new ChordType('maj7', [4, 7, 11]),
    Minor7th: new ChordType('m7', [3, 5, 7]),
    Dominant7th: new ChordType('7', [4, 7, 10]),
    Diminished7th: new ChordType('dim7', [3, 6, 9]),
    MajorSixth: new ChordType("6", [4, 7, 9]),
    MinorSixth: new ChordType("m6", [3, 7, 9])
}

class Chord {
    constructor(tonic, type) {
        this.tonic = tonic;
        this.type = type;
        
        this.notes = [ this.tonic ]
        this.type.semitones.forEach(semitones => {
            this.notes.push(NotesArray[(this.tonic.tone + semitones) % NotesArray.length])
        })
    }

    toString() {
        return `${this.tonic}${this.type.symbol} [${this.notes}]`
    }
}

class Progression {
    constructor(intervals, chords, parent) {
        this.intervals = intervals;
        this.chords = chords;
        this.parent = parent;
    }

    toString() {
        return `${this.intervals.join('-')} in ${this.parent.toString()}\n\t${this.chords.join('\n\t')}`
    }
}

class Degree {
    constructor(index, symbol) {
        this.index = index;
        this.symbol = symbol;
        this.type = ChordTypes.Major;
    }

    chord(note) {
        return new Chord(note, this.type);
    }

    toString() {
        switch (this.type) {
            default:
            case ChordTypes.Major:
                return this.symbol.toUpperCase();
            case ChordTypes.Minor:
            case ChordTypes.Diminished:
                return this.symbol.toLowerCase();
        }
    }

    m() {
        this.type = ChordTypes.Minor;
        return this;
    }

    aug() {
        this.type = ChordTypes.Augmented;
        return this;
    }

    dim() {
        this.type = ChordTypes.Diminished;
        return this;
    }

    sus2() {
        this.type = ChordTypes.Sus2;
        return this;
    }

    sus4() {
        this.type = ChordTypes.Sus4;
        return this;
    }

    maj7() {
        this.type = ChordTypes.Major7th;
        return this;
    }

    m7() {
        this.type = ChordTypes.Minor7th;
        return this;
    }

    dom7() {
        this.type = ChordTypes.Dominant7th;
        return this;
    }

    dim7() {
        this.type = ChordTypes.Diminished7th;
        return this;
    }

    maj6() {
        this.type = ChordTypes.MajorSixth;
        return this;
    }

    m6() {
        this.type = ChordTypes.MinorSixth;
        return this;
    }

}

const I = new Degree(0, 'I');
const II = new Degree(1, 'II');
const III = new Degree(2, 'III');
const IV = new Degree(3, 'IV');
const V = new Degree(4, 'V');
const VI = new Degree(5, 'VI');
const VII = new Degree(6, 'VII');


// Run

Object.values(Scales).forEach(scale => {
    console.log(scale.toString())
    console.log(scale.applyMode(Modes.Mixolydian).toString())
    console.log('-----------')
})


console.log(Scales.CMajor.applyMode(Modes.Aeolian).progression(I.maj7(), IV, V, VII.dim()).toString())
console.log('-----------')
console.log(new Chord(C, ChordTypes.Major7th).toString());

