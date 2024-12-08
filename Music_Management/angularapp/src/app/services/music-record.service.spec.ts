import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MusicRecordService } from './music-record.service'; // Adjusted service import
import { MusicRecord } from '../models/music-record.model'; // Adjusted model import

describe('MusicRecordService', () => {
  let service: MusicRecordService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicRecordService], // Changed service provider to MusicRecordService
    });
    service = TestBed.inject(MusicRecordService); // Changed service variable assignment to MusicRecordService
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('MusicRecordService_should_be_created', () => {
    expect(service).toBeTruthy();
  });

  fit('MusicRecordService_should_add_a_playlist_and_return_it', () => {
    const mockPlaylist: MusicRecord = {
      musicRecordId: 100,
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      price: 10.99,
      stockQuantity: 100
    };

    service.addPlaylist(mockPlaylist).subscribe((event) => {
      expect(event).toEqual(mockPlaylist);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Playlist`); // Adjusted API endpoint
    expect(req.request.method).toBe('POST');
    req.flush(mockPlaylist);
  });

  fit('MusicRecordService_should_get_playlists', () => {
    const mockPlaylists: MusicRecord[] = [
      {
        musicRecordId: 100,
        artist: 'Test Artist',
        album: 'Test Album',
        genre: 'Test Genre',
        price: 10.99,
        stockQuantity: 100
      }
    ];

    service.getPlaylists().subscribe((events) => {
      expect(events).toEqual(mockPlaylists);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Playlist`); // Adjusted API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylists);
  });

  fit('MusicRecordService_should_delete_playlist', () => {
    const musicRecordId = 100;

    service.deletePlaylist(musicRecordId).subscribe(() => {
      expect().nothing();
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Playlist/${musicRecordId}`); // Adjusted API endpoint
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  fit('MusicRecordService_should_get_playlist_by_id', () => {
    const musicRecordId = 100;
    const mockPlaylist: MusicRecord = {
      musicRecordId: musicRecordId,
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      price: 10.99,
      stockQuantity: 100
    };

    service.getPlaylist(musicRecordId).subscribe((event) => {
      expect(event).toEqual(mockPlaylist);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Playlist/${musicRecordId}`); // Adjusted API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylist);
  });

  fit('MusicRecordService_should_search_playlistnames', () => {
    const mockPlaylists: MusicRecord[] = [
      {
        musicRecordId: 100,
        artist: 'Test Artist',
        album: 'Test Album',
        genre: 'Test Genre',
        price: 10.99,
        stockQuantity: 100
      }
    ];
  
    const searchTerm = 'Test Album';
  
    service.searchPlaylists(searchTerm).subscribe((playlists) => {
      expect(playlists).toEqual(mockPlaylists);
    });
  
    const req = httpTestingController.expectOne((request) => 
      request.url.includes(`${service['apiUrl']}/api/Playlist/search`) && 
      request.params.get('searchTerm') === searchTerm
    );
  
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylists);
  }); 
  
});

