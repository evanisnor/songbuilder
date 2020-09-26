export default class Progression {
    constructor(intervals, chords, parent) {
        this.intervals = intervals;
        this.chords = chords;
        this.parent = parent;
    }

    toString() {
        return `${this.intervals.join('-')} in ${this.parent.toString()}\n\t${this.chords.join('\n\t')}`
    }
}