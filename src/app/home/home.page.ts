import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Note } from '../interfaces/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public notes: Note[] = [];

  constructor(private alertCtrl: AlertController,
    private navCtrl: NavController, public notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
  }

  async loadNotes() {
    await this.notesService.load();
    this.notes = this.notesService.getAllNotes();
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'New Note',
      message: 'What should the title of this note be?',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.title) {
              this.notesService.createNote(data.title);
              this.loadNotes();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
