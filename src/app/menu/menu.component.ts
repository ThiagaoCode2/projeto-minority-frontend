import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit
{
  nome      = environment.nome
  foto      = environment.foto
  id        = environment.id
  linkedin  = environment.linkedin
  profissao = environment.profissao
  empresa   = environment.empresa
  
  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit( ) {  }

  sair( )
  {
    this.router.navigate( ['/entrar'] )
    environment.token = ''
    environment.nome  = ''
    environment.foto  = ''
    environment.id    = 0
  }

}
