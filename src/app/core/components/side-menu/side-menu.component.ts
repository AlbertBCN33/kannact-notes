import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { iSideMenuItem } from '../../../shared/models/menu.model';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {

	// Navigation menu
	menu: iSideMenuItem[] = [
		{
			id: 'notes',
			label: 'MODULE_NOTES.MENU_TITLE',
			routerLink: ['/notes']
		},
		{
			id: 'dummy',
			label: 'MODULE_DUMMY.MENU_TITLE',
			routerLink: ['/dummy']
		}
	];

	// Language form
	componentForm: FormGroup;
	languages: { id: string, label: string }[] = [
		{ id: 'en', label: this.translateService.instant('COMMON.LANGUAGES.en') },
		{ id: 'es', label: this.translateService.instant('COMMON.LANGUAGES.es') }
	];

	constructor(
		private fb: FormBuilder,
		private translateService: TranslateService
	) {
		this.componentForm = this.setForm();
	}

	ngOnInit(): void {
	}

	setForm = (): FormGroup => this.fb.group({ language: [this.translateService.currentLang || 'en'] });

	languageChanged = (): void => {
		this.translateService.use(this.componentForm.get('language')?.value);
	}

}
