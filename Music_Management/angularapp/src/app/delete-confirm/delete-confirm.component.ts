import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicRecordService } from '../services/music-record.service' // Adjusted service name
import { MusicRecord } from '../models/music-record.model'; // Adjusted model name

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
  musicRecordId: number;
  musicRecord: MusicRecord = {} as MusicRecord; // Initialize musicRecord property with an empty object

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private musicRecordService: MusicRecordService // Adjusted service name
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.musicRecordId = +params['id']; // Adjust parameter name to 'id' if it matches the route parameter
      this.musicRecordService.getMusicRecord(this.musicRecordId).subscribe(
        (musicRecord: MusicRecord) => {
          this.musicRecord = musicRecord;
        },
        error => {
          console.error('Error fetching music record:', error);
        }
      );
    });
  }

  confirmDelete(musicRecordId: number): void { // Adjust method signature
    this.musicRecordService.deleteMusicRecord(musicRecordId).subscribe(
      () => {
        console.log('Music record deleted successfully.');
        this.router.navigate(['/viewMusicRecords']); // Adjust the route to navigate after deletion
      },
      (error) => {
        console.error('Error deleting music record:', error);
      }
    );
  }

  cancelDelete(): void {
    this.router.navigate(['/viewMusicRecords']); // Adjust the route to navigate on cancel
  }
}
