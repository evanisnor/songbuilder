import { NotesArray } from './Note.js';

class ChordType {
    constructor(symbol, semitones) {
        this.symbol = symbol;
        this.semitones = semitones;
    }
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

export {
    Chord,
    ChordTypes
}