import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './highlight/highlight.pipe';
import { FilterByPipe } from './filter-by/filter-by.pipe';



@NgModule({
	declarations: [
		HighlightPipe, 
		FilterByPipe
	],
	imports: [
		CommonModule
	],
	exports: [
		HighlightPipe, 
		FilterByPipe
	]
})
export class PipesModule { }
