import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'k-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.sass']
})
export class PanelComponent implements OnInit {

	/* Component inputs */

	@Input() label: string = '';
	@Input() toggleable: boolean  = true;
	@Input() showBackground: boolean = true;

	/* Component outputs */

	constructor() { }

	ngOnInit(): void {
	}

}
