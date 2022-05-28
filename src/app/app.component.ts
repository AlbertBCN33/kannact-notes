import { Component } from '@angular/core';
import { PageLayoutService } from './core/services/page-layout/page-layout.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	
	constructor(
		public pageLayoutService: PageLayoutService
	) {
		// Listen to the route changes in order to update the layout features (page title, breadcrumb, etc.)
		this.pageLayoutService.listenNavigation();
	}

}
