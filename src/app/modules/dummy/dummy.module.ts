import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy.component';

const routes: Routes = [
	{
		path: '',
		component: DummyComponent,
		data: { title: 'MODULE_DUMMY.PAGE_TITLE' }
	}
];

@NgModule({
	declarations: [
		DummyComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class DummyModule { }
