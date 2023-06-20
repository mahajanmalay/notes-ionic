import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private loaded: boolean = false;

  constructor(private storage: Storage) {}

  async load(): Promise<boolean> {
    await this.storage.create();
    const notes = await this.storage.get('notes');
    if (notes) {
      this.notes = notes;
    }
    this.loaded = true;
    return true;
  }

  getAllNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: string): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  async createNote(title: string): Promise<void> {
    const id = this.generateUniqueId();
    const newNote: Note = {
      id: id.toString(),
      title: title,
      content: ''
    };
    this.notes.push(newNote);
    await this.save();
  }

  async updateNote(note: Note): Promise<void> {
    const index = this.notes.findIndex(n => n.id === note.id);
    if (index > -1) {
      this.notes[index] = note;
      await this.save();
    }
  }

  async deleteNoteById(id: string): Promise<void> {
    const index = this.notes.findIndex(note => note.id === id);
    if (index > -1) {
      this.notes.splice(index, 1);
      await this.save();
    }
  }

  private generateUniqueId(): number {
    const ids = this.notes.map(note => parseInt(note.id, 10));
    const maxId = Math.max(...ids, 0);
    return maxId + 1;
  }

  private async save(): Promise<void> {
    await this.storage.set('notes', this.notes);
  }
}
