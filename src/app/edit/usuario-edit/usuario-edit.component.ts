import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { Usuario } from '../../model/Usuario';
import { AlertasService } from '../../service/alertas.service';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-edit',
  imports: [FormsModule],
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.css'
})
export class UsuarioEditComponent implements OnInit 
{
  usuario: Usuario = new Usuario()
  idUsuario!: number;
  confirmarSenha!: string;
  tipoUsuario!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit( ) 
  {
    window.scroll( 0, 0 )

    if( environment.token == "" ) 
    {
      this.router.navigate( ['/entrar'] )
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario( this.idUsuario )
  }

  confirmSenha( event: any )
  {
    this.confirmarSenha = event.target.value
  }

  tipoUser( event: any ) 
  {
    this.tipoUsuario = event.target.value
  }

  atualizar( ) 
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

        this.alertas.showAlertSuccess( "Usuário atualizado com sucesso, faça o login novamente!" )
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate( ['/entrar'] )
      })

    }
  }

  findByIdUsuario( id: number ) 
  {
    this.authService.getByIdUsuario( id ).subscribe( ( resp: Usuario ) => {
      this.usuario = resp
    })
  }

}