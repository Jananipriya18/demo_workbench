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

  fit('MusicRecordService_should_add_a_music_record_and_return_it', () => {
    const mockMusicRecord: MusicRecord = {
      musicRecordId: 100,
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      price: 10.99,
      stockQuantity: 100
    };

    service.addMusicRecord(mockMusicRecord).subscribe((event) => {
      expect(event).toEqual(mockMusicRecord);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/api/MusicRecord`); // Adjusted API endpoint
    expect(req.request.method).toBe('POST');
    req.flush(mockMusicRecord);
  });

  fit('MusicRecordService_should_get_music_records', () => {
    const mockMusicRecords: MusicRecord[] = [
      {
        musicRecordId: 100,
        artist: 'Test Artist',
        album: 'Test Album',
        genre: 'Test Genre',
        price: 10.99,
        stockQuantity: 100
      }
    ];

    service.getMusicRecords().subscribe((events) => {
      expect(events).toEqual(mockMusicRecords);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/api/MusicRecord`); // Adjusted API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockMusicRecords);
  });

  fit('MusicRecordService_should_delete_music_record', () => {
    const musicRecordId = 100;

    service.deleteMusicRecord(musicRecordId).subscribe(() => {
      expect().nothing();
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/api/MusicRecord/${musicRecordId}`); // Adjusted API endpoint
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  fit('MusicRecordService_should_get_music_record_by_id', () => {
    const musicRecordId = 100;
    const mockMusicRecord: MusicRecord = {
      musicRecordId: musicRecordId,
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      price: 10.99,
      stockQuantity: 100
    };

    service.getMusicRecord(musicRecordId).subscribe((event) => {
      expect(event).toEqual(mockMusicRecord);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/api/MusicRecord/${musicRecordId}`); // Adjusted API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockMusicRecord);
  });

  fit('MusicRecordService_should_search_music_records', () => {
    const mockMusicRecords: MusicRecord[] = [
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
  
    service.searchMusicRecords(searchTerm).subscribe((musicRecords) => {
      expect(musicRecords).toEqual(mockMusicRecords);
    });
  
    const req = httpTestingController.expectOne((request) => 
      request.url.includes(`${service['apiUrl']}/api/MusicRecord/search`) && 
      request.params.get('searchTerm') === searchTerm
    );
  
    expect(req.request.method).toBe('GET');
    req.flush(mockMusicRecords);
  }); 
  
});

