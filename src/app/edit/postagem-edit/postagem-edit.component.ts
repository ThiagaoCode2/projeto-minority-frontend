import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { Postagem } from '../../model/Postagem';
import { Tema } from '../../model/Tema';
import { AlertasService } from '../../service/alertas.service';
import { PostagemService } from '../../service/postagem.service';
import { TemaService } from '../../service/tema.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-postagem-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [BsModalService, AlertasService],
  templateUrl: './postagem-edit.component.html',
  styleUrl: './postagem-edit.component.css'
})
export class PostagemEditComponent implements OnInit 
{
  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas!: Tema[];
  idTema!: number;

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit( ) 
  {
    if( environment.token == "" ) 
    {
      this.alertas.showAlertInfo( 'Sua seção expirou, faça o login novamente.' )
      this.router.navigate( ['/entrar'] )
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem( id )

    this.findAllTemas( )
  }

  findByIdPostagem( id: number )
  {
    this.postagemService.getByIdPostagem( id ).subscribe( ( resp: Postagem ) => {
      this.postagem = resp

      // Se o tema existir na postagem, inicialize idTema
      if( this.postagem.tema && this.postagem.tema.id ) 
      {
        this.idTema = this.postagem.tema.id;
      }
      
    })
  }

  findByIdTema( )
  {
    this.temaService.getByIdTema( this.idTema ).subscribe( ( resp: Tema ) => {
      this.tema = resp
    })
  }

  findAllTemas( )
  {
    this.temaService.getAllTema( ).subscribe( ( resp: Tema[] ) => {
      this.listaTemas = resp
    })
  }

  atualizar( )
  {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem( this.postagem ).subscribe( ( resp: Postagem ) => {
      this.postagem = resp
      this.alertas.showAlertSuccess( "Postagem atualizada com sucesso" )
      this.router.navigate( ['/inicio'] )
    })
  }

  onRetornaInicio( )
  {
    this.router.navigate( ['/inicio'] )
  }

}