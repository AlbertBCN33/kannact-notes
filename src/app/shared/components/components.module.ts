import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { PageTitleComponent } from './page-title/page-title.component';
import { PanelComponent } from './panel/panel.component';



@NgModule({
	declarations: [
		PageTitleComponent,
  		PanelComponent
	],
	imports: [
		CommonModule,
		TranslateModule.forChild(),
		PanelModule
	],
	exports: [
		PageTitleComponent,
		PanelComponent
	]
})
export class SharedComponentsModule { }
