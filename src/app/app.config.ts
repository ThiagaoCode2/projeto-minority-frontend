import { ApplicationConfig } from '@angular/core';
// import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { platformBrowser } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter( routes ),
    // provideClientHydration( withEventReplay( ) ),
    // provideHttpClient( withFetch( ) )
  ]
};

// // No lado do cliente, o BrowserModule é carregado
// if( platformBrowser( ) ) 
// {
//   appConfig.providers.push( BrowserModule );
// }
