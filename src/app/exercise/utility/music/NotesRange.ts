import {
  NoteNumberOrName,
  NoteNumber
} from './notes/NoteNumberOrName';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  toNoteNumber,
  toNoteName
} from './notes/toNoteName';
import { Key } from './keys/Key';
import { Memoize } from 'lodash-decorators';
import { isInKey } from './keys/isInKey';

export class NotesRange {
  readonly lowestNoteNumber: NoteNumber;
  readonly highestNoteNumber: NoteNumber;

  readonly lowestNoteName: Note;
  readonly highestNoteName: Note;

  readonly rangeSizeInSemitones: number;

  constructor(range: {
    lowestNote: NoteNumberOrName,
    highestNote: NoteNumberOrName,
  });
  constructor(lowestNote: NoteNumberOrName, highestNote: NoteNumberOrName);
  constructor(lowestNoteOrRange: NoteNumberOrName | {
    lowestNote: NoteNumberOrName,
    highestNote: NoteNumberOrName,
  }, highestNote?: NoteNumberOrName) {
    // let lowestNote:
    if (typeof lowestNoteOrRange === 'object') {
      this.lowestNoteNumber = toNoteNumber(lowestNoteOrRange.lowestNote);
      this.highestNoteNumber = toNoteNumber(lowestNoteOrRange.highestNote);
    } else {
      this.lowestNoteNumber = toNoteNumber(lowestNoteOrRange);
      this.highestNoteNumber = toNoteNumber(highestNote!);
    }

    this.rangeSizeInSemitones = this.highestNoteNumber - this.lowestNoteNumber;

    if (this.rangeSizeInSemitones < 0) {
      throw new Error(`Invalid note range ${this.lowestNoteName}-${this.highestNoteName}`);
    }

    this.lowestNoteName = toNoteName(this.lowestNoteNumber);
    this.highestNoteName = toNoteName(this.highestNoteNumber);
  }

  isInRange(noteList: NoteNumberOrName[]): boolean;
  isInRange(note: NoteNumberOrName): boolean
  @Memoize()
  isInRange(noteOrNoteList: NoteNumberOrName | NoteNumberOrName[]): boolean {
    if (Array.isArray(noteOrNoteList)) {
      return noteOrNoteList.every(this.isInRange.bind(this));
    }
    const noteNumber = toNoteNumber(noteOrNoteList);
    return noteNumber >= this.lowestNoteNumber && noteNumber <= this.highestNoteNumber;
  }

  @Memoize()
  getAllNotes(key?: Key): Note[] {
    const notes: Note[] = [];
    for (let i = this.lowestNoteNumber; i <= this.highestNoteNumber; i++) {
      if (key) {
        if (!isInKey(i, key)) {
          continue;
        }
      }
      notes.push(toNoteName(i));
    }
    return notes;
  }
}
