
/**
 * Modes as they can be applied to scales
 * 
 * 0 Ionian
 * 1 Dorian
 * 2 Phyrgian
 * 3 Lydian
 * 4 Mixolydian
 * 5 Aeolian
 * 6 Locrian
 */
class Mode {

    constructor(name, offset) {
        this.name = name;
        this.offset = offset;
    }

    toString() {
        return `Mode[name=${this.name}, offset=${this.offset}]`
    }
}

const Modes = {
    Lydian:         new Mode('Lydian', 3),
    Ionian:         new Mode('Ionian', 0),
    Mixolydian:     new Mode('Mixolydian', 4),
    Dorian:         new Mode('Dorian', 1),
    Aeolian:        new Mode('Aeolian', 5),
    Phrygian:       new Mode('Phrygian', 2),
    Locrian:        new Mode('Locrian', 6)
}

export default Modes;
