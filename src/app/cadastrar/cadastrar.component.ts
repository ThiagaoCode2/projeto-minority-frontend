import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  imports: [FormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit 
{

  usuario: Usuario = new Usuario

  confirmarSenha!: string;
  tipoUsuario!:    string;
  
  constructor(
    private authService: AuthService,
    private router:      Router,
    private alertas:     AlertasService
  ) { }

  ngOnInit( ) 
  {
    window.scroll( 0,0 )
  }

  cadastrar( )
  {
    // console.log( JSON.stringify( this.usuario ) ) // -->  inicializao do cadastrar
    this.usuario.tipo = this.tipoUsuario

    if( this.usuario.senha != this.confirmarSenha )
    {
      this.alertas.showAlertDanger("As senhas estão incorretas")
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

}