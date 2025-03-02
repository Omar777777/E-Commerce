import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { addtokenInterceptor } from './core/interceptores/addtoken.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { globalloadingInterceptor } from './core/interceptores/globalloading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([addtokenInterceptor,globalloadingInterceptor])),
    importProvidersFrom(BrowserAnimationsModule,NgxSpinnerModule),
    provideToastr()
  ]
};
