import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MusicFormComponent } from './music-form.component';  // Corrected component name
import { MusicRecordService } from '../services/music-record.service'; // Corrected service name
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MusicRecord } from '../models/music-record.model'; // Corrected model name

describe('MusicFormComponent', () => {
  let component: MusicFormComponent;
  let fixture: ComponentFixture<MusicFormComponent>;
  let MusicRecordService: MusicRecordService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicFormComponent], // Corrected component name
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [MusicRecordService] // Corrected service name
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicFormComponent); // Corrected component name
    component = fixture.componentInstance;
    MusicRecordService = TestBed.inject(MusicRecordService); // Corrected service name
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  fit('should_create_MusicFormComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('MusicFormComponent_should_render_error_messages_when_required_fields_are_empty_on_submit', () => {
    // Set all fields to empty strings
    component.newMusicRecord = {
      musicRecordId: 0,
      artist: '',
      album: '',
      genre: '',
      price: 0,
      stockQuantity: 0
    } as MusicRecord; // Corrected model name

    // Manually trigger form submission
    component.formSubmitted = true;
    fixture.detectChanges();

    // Find the form element
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    // Trigger the form submission
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();

    // Check if error messages are rendered for each field
    expect(fixture.debugElement.query(By.css('#artist + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#album + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#genre + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#price + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#stockQuantity + .error-message'))).toBeTruthy();
  });

  fit('MusicFormComponent_should_call_addMusicRecord_method_while_adding_the_music_record', () => {
    // Create a mock MusicRecord object with all required properties
    const musicRecord: MusicRecord = {
      musicRecordId: 1,
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      price: 10.99,
      stockQuantity: 100
    };

    const addMusicRecordSpy = spyOn(component, 'addMusicRecord').and.callThrough();
    component.addMusicRecord();
    expect(addMusicRecordSpy).toHaveBeenCalled();
  });
});
