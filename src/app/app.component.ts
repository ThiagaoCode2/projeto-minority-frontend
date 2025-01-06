import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, CommonModule, MenuComponent, RodapeComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'minority-frontend';

  constructor(
    public auth: AuthService
  ){}
}
