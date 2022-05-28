import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageLayoutService } from '../page-layout/page-layout.service';

@Injectable({
	providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

	/**
	 * The Angular interceptor only works for http request made with the http client. 
	 * AngularFire uses the Firebase SDK for Firestore operations, which does not use the http client from Angular. 
	 * So the AngularFire requests can not be intercepted.
	 */

	private countRequests: number = 0;

	constructor(
		private pageLayoutService: PageLayoutService
	) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		this.countRequests++;
		this.pageLayoutService.setSpinner(true);

		return next.handle(request).pipe(tap(
			(ev: HttpEvent<any>) => {
				if (ev instanceof HttpResponse) {
					/*
						Response OK:
						We could show a success message on screnn, etc.
					*/
				}
			}),
			catchError((response: HttpErrorResponse) => {
				if (response instanceof HttpErrorResponse) {
					/**
					 * Response KO:
					 * We could show a custom backend error message, or handle generic HTTP errors like 404, 503, 500, etc.
					 */
				}
				return throwError(() => response);
			}),
			finalize(() => {
				/*
					In case there multiple simultaneous requests, we will only close the spinner
					when the last one is done.
				 */
				this.countRequests--;
				if (this.countRequests === 0) {
					this.pageLayoutService.setSpinner(false);
				}
			})
		);
	}
}
