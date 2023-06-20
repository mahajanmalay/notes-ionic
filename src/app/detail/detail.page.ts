import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../interfaces/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public note!: Note;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    this.note = this.notesService.getNoteById(noteId!)!;
  }

  async saveNote() {
    await this.notesService.updateNote(this.note);
  }

  async deleteNote() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this note?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.notesService.deleteNoteById(this.note.id);
            this.navCtrl.navigateBack('/notes');
          }
        }
      ]
    });

    await alert.present();
  }
}
