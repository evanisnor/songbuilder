
/**
 * A note represents a tone on the traditional 12-note western music theory.
 * 
 *  Chromatic Ascending		A	A♯	B	C	C♯	D	D♯	E	F	F♯	G	G♯
 *  Chromatic Descending	A	B♭	B	C	D♭	D	E♭	E	F	G♭	G	A♭
 */
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

    get codeFriendlyLabel() {
        return this.labelAscending.replace('♯', 'Sharp').replace('♭', 'Flat')
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

export {
    Notes,
    NotesArray,
    A, Asharp, B, C, Csharp, D, Dsharp, E, F, Fsharp, G, Gsharp
}
