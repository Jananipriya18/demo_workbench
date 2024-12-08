import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-form',
  templateUrl: './music-form.component.html',
  styleUrls: ['./music-form.component.css']
})
export class MusicFormComponent {
  newMusicRecord: MusicRecord = {
    musicRecordId: 0,
    artist: '',
    album: '',
    genre: '',
    price: 0,
    stockQuantity: 0
  }; // Initialize newMusicRecord with empty fields

  formSubmitted = false; // Track form submission

  constructor(private playlistService: PlaylistService, private router: Router) { }

  addMusicRecord(): void {
    this.formSubmitted = true; // Set formSubmitted to true on form submission

    // Validate if any required field is empty
    if (!this.newMusicRecord.artist || !this.newMusicRecord.album || 
        !this.newMusicRecord.genre || !this.newMusicRecord.price || 
        !this.newMusicRecord.stockQuantity) {
      console.log('Form is invalid.');
      return;
    }

    // If form is valid, add the music record
    this.playlistService.addPlaylist(this.newMusicRecord).subscribe(() => {
      console.log('Music record added successfully!');
      this.router.navigate(['/viewPlaylists']);
    });
  }
}
