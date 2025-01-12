import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';
import { environment } from '../../environments/environment.prod';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-entrar',
  standalone: true,
  imports: [FormsModule],
  providers: [BsModalService, AlertasService],
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.css'
})
export class EntrarComponent 
{
  usuarioLogin: UsuarioLogin = new UsuarioLogin( )

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  clickEntrar( )
  {
    this.auth.entrar( this.usuarioLogin ).subscribe( ( resp: UsuarioLogin )=> {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.nome  = this.usuarioLogin.nome
      environment.foto  = this.usuarioLogin.foto
      environment.id    = this.usuarioLogin.id
      environment.tipo  = this.usuarioLogin.tipo
      
      this.router.navigate( ['/inicio'] )

    }, erro =>{
      if( erro.status == 500 || erro.status == 400 )
      {
        this.alertas.showAlertDanger( 'Usuário ou senha esão incorretos!' )
      }

    })

  }

  clickOnCadastro( )
  {
    this.router.navigate( ['/cadastrar'] )
  }

}