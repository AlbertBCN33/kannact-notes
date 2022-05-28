import { InterceptorService } from './core/services/interceptor/interceptor.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

// Firebase (BBDD)
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Primeng
import { BlockUIModule } from 'primeng/blockui';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedComponentsModule } from './shared/components/components.module';

// Translations
export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}
export function appInitializerFactory(translate: TranslateService) {
	return () => {
		translate.addLangs(['en', 'es']);
		translate.setDefaultLang('en');
		return lastValueFrom(translate.use('en'));
	}
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		SharedComponentsModule,
		BlockUIModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    	provideFirestore(() => getFirestore()),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializerFactory,
			deps: [TranslateService],
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
