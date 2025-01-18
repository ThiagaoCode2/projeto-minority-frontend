import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { environment } from '../../environments/environment.prod';
import { Router, RouterModule } from '@angular/router';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { AuthService } from '../service/auth.service';
import { AlertasService } from '../service/alertas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, OrderByPipe],
  providers: [BsModalService, AlertasService],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit 
{
  postagem: Postagem = new Postagem()
  listaPostagens!: Postagem[];
  tituloPost!: string;


  tema: Tema = new Tema()
  listaTemas!: Tema[];
  idTema!: number;
  nomeTema!: string;

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService

  ) { }

  ngOnInit( ) 
  {
    if( environment.token == "")  
    {
      this.alertas.showAlertInfo( 'Sua seção expirou, faça o login novamente.' )
      this.router.navigate( ['/entrar'] )
    }

    this.getAllTemas( )
    this.getAllPostagens( )
    //this.findByIdUsuario()
    
  }

  getAllTemas( ) 
  {
    this.temaService.getAllTema( ).subscribe( (resp: Tema[] ) => {
      this.listaTemas = resp
    })
  }

  findByIdTema( ) 
  {
    this.temaService.getByIdTema( this.idTema ).subscribe( ( resp: Tema ) => {
      this.tema = resp
    })
  }

  getAllPostagens( ) 
  {
    this.postagemService.getAllPostagens( ).subscribe( (resp: Postagem[] ) => {
      this.listaPostagens = resp
    })

  }

  findByIdUsuario(){
    this.authService.getByIdUsuario( this.idUsuario ).subscribe((resp: Usuario) => {
      this.usuario = resp
    })

  }

  publicar( ) 
  {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem( this.postagem ).subscribe( ( resp: Postagem ) => {
      this.postagem = resp
      this.alertas.showAlertSuccess( "Postagem realizada com sucesso!" )
      this.postagem = new Postagem( )
      this.getAllPostagens( )
    })
  }

  findByTituloPostagem( )
  {
    if( this.tituloPost == '' )
    {
      this.getAllPostagens( )
    } 
    else 
    {
      this.postagemService.getByTituloPostagem( this.tituloPost ).subscribe( (resp: Postagem[] ) => {
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema( )
  {
    if( this.nomeTema == '' )
    {
      this.getAllTemas( )
    } 
    else 
    {
      this.temaService.getByNomeTema( this.nomeTema ).subscribe( ( resp: Tema[] ) => {
        this.listaTemas = resp
      })
    }
  }

}