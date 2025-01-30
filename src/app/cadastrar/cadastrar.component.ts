import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [FormsModule],
  providers: [BsModalService, AlertasService],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent
{

  usuario: Usuario = new Usuario

  confirmarSenha!: string;
  tipoUsuario!:    string;
  
  constructor(
    private authService: AuthService,
    private router:      Router,
    private alertas:     AlertasService
  ) { }

  cadastrar( )
  {
    this.usuario.tipoDeUsuario = this.tipoUsuario

    if( this.usuario.senha != this.confirmarSenha )
    {
      this.alertas.showAlertDanger( "As senhas estão incorretas" )
    } 
    else
    {
      this.authService.cadastrar( this.usuario ).subscribe( ( resp: Usuario ) => {
        this.usuario = resp
        this.router.navigate( ['/entrar'] )

        this.alertas.showAlertSuccess( "Usuário cadastrado com sucesso!" )
      } )
    }
  }

  confirmSenha( event: any )
  {
    this.confirmarSenha = event.target.value
  }

  tipoUser( event: any )
  {
    this.tipoUsuario = event.target.value
  }

  clickOnEntrar( )
  {
    this.router.navigate( ['/entrar'] )
  }

  isFormValid( ): boolean 
  {
    return this.usuario.nome      && 
           this.usuario.usuario   && 
           this.usuario.senha     && 
           this.confirmarSenha    && 
           this.tipoUsuario       && 
           this.usuario.linkedin  && 
           this.usuario.profissao && 
           this.usuario.empresa ? true : false;
  }
  

}