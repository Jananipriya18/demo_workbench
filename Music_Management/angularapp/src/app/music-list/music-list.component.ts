import { Component, OnInit } from '@angular/core';
import { MusicRecord } from '../models/music-record.model';
import { MusicRecordService } from '../services/music-record.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  musicRecords: MusicRecord[] = []; // Changed recipes to musicRecords
  searchTerm: string = '';

  constructor(private musicRecordService: MusicRecordService, private router: Router) { } // Adjusted service name

  ngOnInit(): void {
    this.loadMusicRecords(); // Adjusted the method name
  }

  loadMusicRecords(): void {
    this.musicRecordService.getMusicRecords().subscribe(musicRecords => this.musicRecords = musicRecords); // Adjusted the service method name
  }

  deleteMusicRecord(musicRecordId: number): void { // Adjusted the method name and parameter
    // Navigate to confirm delete page with the music record ID as a parameter
    this.router.navigate(['/confirmDelete', musicRecordId]);
  }
  searchMusicRecords(): void {
    if (this.searchTerm) {
      this.musicRecordService.searchMusicRecords(this.searchTerm).subscribe(musicRecords => this.musicRecords = musicRecords);
    } else {
      this.loadMusicRecords();
    }
  }
}
