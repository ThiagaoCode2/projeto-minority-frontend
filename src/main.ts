import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { destroyPlatform } from '@angular/core';

if( typeof destroyPlatform === 'function' ) 
{
  destroyPlatform( ); // Garante que não há plataforma anterior.
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
