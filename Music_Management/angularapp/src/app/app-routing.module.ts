import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicFormComponent } from './music-form/music-form.component';
import { MusicListComponent } from './music-list/music-list.component'; 
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';


const routes: Routes = [
  { path: 'addNewMusicRecord', component: MusicFormComponent },
  { path: 'viewMusicRecords', component: MusicListComponent },
  { path: 'confirmDelete/:id', component: DeleteConfirmComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
