import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';
import { HeaderComponent } from './header/header.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { MusicFormComponent } from './music-form/music-form.component';
import { MusicListComponent } from './music-list/music-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistFormComponent,
    HeaderComponent,
    PlaylistListComponent,
    DeleteConfirmComponent,
    MusicFormComponent,
    MusicListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
