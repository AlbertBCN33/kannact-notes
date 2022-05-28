// Core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Primeng components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';

// Module
import { NotesComponent } from './notes.component';
import { SharedComponentsModule } from '../../shared/components/components.module';
import { PipesModule } from '../../shared/pipes/pipes.module';

// Module routes
const routes: Routes = [
	{
		path: '',
		component: NotesComponent,
		data: { title: 'MODULE_NOTES.PAGE_TITLE' }
	}
];

@NgModule({
	declarations: [
		NotesComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		RouterModule.forChild(routes),
		SharedComponentsModule,
		ButtonModule,
		InputTextModule,
		EditorModule,
		PipesModule
	]
})
export class NotesModule { }
