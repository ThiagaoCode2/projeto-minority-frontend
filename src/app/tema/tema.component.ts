import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tema',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css'
})
export class TemaComponent implements OnInit 
{

  tema: Tema = new Tema()
  listaTemas!: Tema[]

  constructor(
    private router: Router,
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

    if( environment.tipoDeUsuario != "admin" )
    {
      this.alertas.showAlertInfo( 'Você precisa ser administrador para acessar essa rota' )
      this.router.navigate( ['/inicio'] )
    }

    this.findAllTemas( )
  }

  findAllTemas( )
  {
    this.temaService.getAllTema( ).subscribe( (resp: Tema[] )=>{
      this.listaTemas = resp
    })
  }

  cadastrar( )
  {
    this.temaService.postTema(this.tema).subscribe( (resp: Tema )=> {
      this.tema = resp
      this.alertas.showAlertSuccess( "Tema cadastrado com sucesso!" )
      this.findAllTemas( )
      this.tema = new Tema( ) // --> zerar tema deixar limpa a tela. QUestao de UX
    })
  }

}