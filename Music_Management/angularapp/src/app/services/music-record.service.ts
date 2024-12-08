import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicRecord } from '../models/music-record.model'; // Adjusted model import

@Injectable({
  providedIn: 'root'
})
export class MusicRecordService {
  private apiUrl = 'https://8080-bdfbfecbcdadbb320699766ebabbcadeeefceacone.premiumproject.examly.io'; // Replace this with your API endpoint

  constructor(private http: HttpClient) { }

  addMusicRecord(musicRecord: MusicRecord): Observable<MusicRecord> { // Adjusted model type
    return this.http.post<MusicRecord>(`${this.apiUrl}/api/MusicRecord`, musicRecord);
  }

  getMusicRecords(): Observable<MusicRecord[]> { // Adjusted model type
    return this.http.get<MusicRecord[]>(`${this.apiUrl}/api/MusicRecord`);
  }

  deleteMusicRecord(musicRecordId: number): Observable<void> {
    const url = `${this.apiUrl}/api/MusicRecord/${musicRecordId}`; // Adjust the URL to match your API endpoint
    return this.http.delete<void>(url);
  }

  getMusicRecord(musicRecordId: number): Observable<MusicRecord> { // Adjusted model type
    const url = `${this.apiUrl}/api/MusicRecord/${musicRecordId}`;
    return this.http.get<MusicRecord>(url);
  }

  searchMusicRecords(searchTerm: string): Observable<MusicRecord[]> { // Adjusted model type
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<MusicRecord[]>(`${this.apiUrl}/api/MusicRecord/search`, { params });
  }
}
