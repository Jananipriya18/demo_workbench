import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MusicRecordService } from '../services/music-record.service'; // Import MusicRecordService
import { MusicListComponent } from './MusicRecord-list.component'; // Adjust the import path
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MusicRecord } from '../models/music-record.model'; // Import MusicRecord model

describe('MusicListComponent', () => {
    let component: MusicListComponent;
    let fixture: ComponentFixture<MusicListComponent>;
    let mockMusicRecordService: jasmine.SpyObj<MusicRecordService>; // Specify the type of mock

    beforeEach(waitForAsync(() => {
        // Create a spy object with the methods you want to mock
        mockMusicRecordService = jasmine.createSpyObj<MusicRecordService>('MusicRecordService', ['getMusicRecords', 'deleteMusicRecord'] as any);

        TestBed.configureTestingModule({
            declarations: [MusicListComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                // Provide the mock service instead of the actual service
                { provide: MusicRecordService, useValue: mockMusicRecordService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MusicListComponent);
        component = fixture.componentInstance;
    });

    fit('should_create_MusicListComponent', () => { // Change the function name
        expect(component).toBeTruthy();
    });

    fit('MusicListComponent_should_call_loadMusicRecords_on_ngOnInit', () => { // Change the function name
        spyOn(component, 'loadMusicRecords'); // Adjust the method name
        fixture.detectChanges();
        expect(component.loadMusicRecords).toHaveBeenCalled(); // Adjust the method name
    });

    fit('MusicListComponent_should_have_searchMusicRecords_method', () => {
        expect(component.searchMusicRecords).toBeDefined();
      }); 

});
