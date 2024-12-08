import { MusicRecord } from './music-record.model'; 
describe('MusicRecord', () => { 
  fit('should_create_music_record_instance', () => { 
    const musicRecord: MusicRecord = { 
      musicRecordId: 1, 
      artist: 'Test Artist', 
      album: 'Test Album', 
      genre: 'Pop',
      price: 19.99,
      stockQuantity: 10
    };

    // Check if the musicRecord object exists
    expect(musicRecord).toBeTruthy();

    // Check individual properties of the musicRecord
    expect(musicRecord.musicRecordId).toBe(1); 
    expect(musicRecord.artist).toBe('Test Artist'); 
    expect(musicRecord.album).toBe('Test Album'); 
    expect(musicRecord.genre).toBe('Pop');
    expect(musicRecord.price).toBe(19.99);
    expect(musicRecord.stockQuantity).toBe(10);
  });
});
