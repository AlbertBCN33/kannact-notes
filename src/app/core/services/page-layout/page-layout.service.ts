import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { iRouteData } from '../../../shared/models/route-data.model';

@Injectable({
	providedIn: 'root'
})
export class PageLayoutService implements OnDestroy {

	private unsubscribe: Subject<void> = new Subject<void>();

	pageTitle: string | null = null;
	spinner: boolean = false;

	constructor(
		private router: Router,
		private aRoute: ActivatedRoute
	) { }

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	listenNavigation = (): void => {
		this.router.events
			.pipe(
				takeUntil(this.unsubscribe),
				map(() => this.aRoute.snapshot),
				map((route) => {
					// Iterate nested childs
					while (route.firstChild) {
						route = route.firstChild;
					}
					return route;
				})
			).subscribe((snapshot: ActivatedRouteSnapshot) => {

				// Update page title
				this.setPageTitle(snapshot.data);

				// Update other general layout features (breadcrumb, stepper, etc.)
			});
	}

	setPageTitle = (data: iRouteData): void => { this.pageTitle = data?.title || null }

	setSpinner = (active: boolean): void => { this.spinner = active }

}
