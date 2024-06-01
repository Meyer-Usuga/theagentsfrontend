import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { requestInterceptor } from './core/interceptor/request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()), 
              provideHttpClient(withFetch(), withInterceptors([requestInterceptor])), 
              importProvidersFrom(BrowserAnimationsModule)]
};
