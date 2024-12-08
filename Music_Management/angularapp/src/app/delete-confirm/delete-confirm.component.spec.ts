import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeleteConfirmComponent } from './delete-confirm.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MusicRecordService } from '../services/music-record.service'; // Adjusted service name
import { MusicRecord } from '../models/music-record.model'; // Adjusted model name

describe('DeleteConfirmComponent', () => {
    let component: DeleteConfirmComponent;
    let fixture: ComponentFixture<DeleteConfirmComponent>;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let mockMusicRecordService: jasmine.SpyObj<MusicRecordService>; // Adjusted service name

    beforeEach(waitForAsync(() => {
        mockMusicRecordService = jasmine.createSpyObj<MusicRecordService>('MusicRecordService', ['getMusicRecord', 'deleteMusicRecord'] as any); // Adjusted service name and methods

        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule, FormsModule, HttpClientTestingModule],
            declarations: [DeleteConfirmComponent],
            providers: [
                { provide: MusicRecordService, useValue: mockMusicRecordService } // Adjusted service name
            ]
        }).compileComponents();
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('should_create_DeleteConfirmComponent', () => {
        expect(component).toBeTruthy();
    });

    fit('DeleteConfirmComponent_should_call_deleteMusicRecord_method_when_confirmDelete_is_called', () => {
        const musicRecordId = 1; // Adjusted ID name
        
        mockMusicRecordService.deleteMusicRecord.and.returnValue(of(null)); // Adjusted method name

        component.confirmDelete(musicRecordId); // Adjusted parameter name

        expect(mockMusicRecordService.deleteMusicRecord).toHaveBeenCalledWith(musicRecordId); // Adjusted method name and parameter
    });
});

