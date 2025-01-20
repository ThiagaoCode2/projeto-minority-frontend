import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { destroyPlatform } from '@angular/core';

if( typeof destroyPlatform === 'function' ) 
{
  destroyPlatform( ); // Garante que não há plataforma anterior.
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
