import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'notes', pathMatch: 'full' },
	{ path: 'notes', loadChildren: () => import('./modules/notes/notes.module').then(module => module.NotesModule) },
	{ path: 'dummy', loadChildren: () => import('./modules/dummy/dummy.module').then(module => module.DummyModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
