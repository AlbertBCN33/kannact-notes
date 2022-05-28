// Core
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Primeng
import { SelectButtonModule } from 'primeng/selectbutton';

// Module
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
	declarations: [
		SideMenuComponent
	],
	imports: [
		CommonModule,
		TranslateModule.forChild(),
		RouterModule,
		SelectButtonModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		SideMenuComponent
	]
})
export class CoreModule { }
