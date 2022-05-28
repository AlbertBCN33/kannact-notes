import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'k-page-title',
	templateUrl: './page-title.component.html',
	styleUrls: ['./page-title.component.sass']
})
export class PageTitleComponent implements OnInit {

	/* Component inputs */

	@Input() label: string | null = null;

	/* Component outputs */

	constructor() { }

	ngOnInit(): void {
	}

}
