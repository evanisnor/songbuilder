import { Chord, ChordTypes } from './Chord.js';

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

export {
    I, II, III, IV, V, VI, VII
}