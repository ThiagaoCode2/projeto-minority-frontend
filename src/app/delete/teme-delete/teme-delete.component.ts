import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { Tema } from '../../model/Tema';
import { AlertasService } from '../../service/alertas.service';
import { TemaService } from '../../service/tema.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-teme-delete',
  standalone: true,
  imports: [RouterModule],
  providers: [BsModalService, AlertasService],
  templateUrl: './teme-delete.component.html',
  styleUrl: './teme-delete.component.css'
})
export class TemaDeleteComponent implements OnInit
{
  tema: Tema = new Tema()
  idTema!: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit( ) 
  {
    if( environment.token == "" )
    {
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema( id: number )
  {
    this.temaService.getByIdTema( id ).subscribe( ( resp: Tema ) => {
      this.tema = resp
    } )
  }

  apagar( )
  {
    this.temaService.deleteTema( this.idTema ).subscribe( () => {
      this.alertas.showAlertSuccess( 'Tema apagado com sucesso!' )
      this.router.navigate( ['/tema'] )
    })
  }

  onRetornaTema( )
  {
    this.router.navigate(['/tema'])
  }

}