import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { Postagem } from '../../model/Postagem';
import { AlertasService } from '../../service/alertas.service';
import { PostagemService } from '../../service/postagem.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-postagem-delete',
  imports: [CommonModule, RouterModule],
  templateUrl: './postagem-delete.component.html',
  styleUrl: './postagem-delete.component.css'
})
export class PostagemDeleteComponent implements OnInit 
{
  postagem: Postagem = new Postagem()
  idPost!: number;

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit( ) 
  {
    window.scroll( 0,0 )

    if( environment.token == "" ) 
    {
      this.alertas.showAlertInfo( 'Sua seção expirou, faça o login novamente.' )
      this.router.navigate( ['/entrar'] )
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem( this.idPost )
  }

  findByIdPostagem( id: number )
  {
    this.postagemService.getByIdPostagem( id ).subscribe( ( resp: Postagem ) => {
      this.postagem = resp
    })
  }

  apagar( )
  {
    this.postagemService.deletePostagem( this.idPost ).subscribe( ( ) => {
      this.alertas.showAlertSuccess( 'Postagem apagada com sucesso!' )
      this.router.navigate( ['/inicio'] )
    })
  }

}