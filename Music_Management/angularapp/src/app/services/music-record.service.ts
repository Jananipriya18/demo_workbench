import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicRecord } from '../models/music-record.model'; // Adjusted model import

@Injectable({
  providedIn: 'root'
})
export class MusicRecordService {
  private apiUrl = 'https://8080-aabdbffdadabafcfd316270188cbdabfbfeaeacaone.premiumproject.examly.io'; // Replace this with your API endpoint

  constructor(private http: HttpClient) { }

  addPlaylist(playlist: MusicRecord): Observable<MusicRecord> { // Adjusted model type
    return this.http.post<MusicRecord>(`${this.apiUrl}/api/Playlist`, playlist);
  }

  getPlaylists(): Observable<MusicRecord[]> { // Adjusted model type
    return this.http.get<MusicRecord[]>(`${this.apiUrl}/api/Playlist`);
  }

  deletePlaylist(playlistId: number): Observable<void> {
    const url = `${this.apiUrl}/api/Playlist/${playlistId}`; // Adjust the URL to match your API endpoint
    return this.http.delete<void>(url);
  }

  getPlaylist(playlistId: number): Observable<MusicRecord> { // Adjusted model type
    const url = `${this.apiUrl}/api/Playlist/${playlistId}`;
    return this.http.get<MusicRecord>(url);
  }

  searchPlaylists(searchTerm: string): Observable<MusicRecord[]> { // Adjusted model type
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<MusicRecord[]>(`${this.apiUrl}/api/Playlist/search`, { params });
  }
}
