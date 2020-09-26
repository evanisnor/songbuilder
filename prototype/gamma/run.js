import { Notes, C } from './Note.js'
import Modes from './Mode.js'
import Scales from './Scale.js';
import { Chord, ChordTypes } from './Chord.js';
import { I, II, III, IV, V, VI, VII } from './Degree.js';

Object.values(Scales).forEach(scale => {
    console.log(`${scale}`)
    console.log(`${scale.applyMode(Modes.Mixolydian)}`)
    console.log('-----------')
})


console.log(Scales.EMajor.applyMode(Modes.Dorian).progression(I.maj7(), IV, V, VII.dim()).toString())
console.log('-----------')
console.log(new Chord(C, ChordTypes.Major7th).toString());

