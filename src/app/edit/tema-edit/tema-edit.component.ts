import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule  } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { Tema } from '../../model/Tema';
import { AlertasService } from '../../service/alertas.service';
import { TemaService } from '../../service/tema.service';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tema-edit',
  standalone: true,
  imports: [FormsModule, RouterModule ],
  providers: [BsModalService, AlertasService],
  templateUrl: './tema-edit.component.html',
  styleUrl: './tema-edit.component.css'
})
export class TemaEditComponent implements OnInit 
{
  tema: Tema = new Tema()

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
      this.router.navigate( ['/entrar'] )
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema( id )
  }

  findByIdTema( id: number )
  {
    this.temaService.getByIdTema( id ).subscribe( ( resp: Tema ) => {
      this.tema = resp
    })
  }

  atualizar( )
  {
    this.temaService.putTema( this.tema ).subscribe( ( resp: Tema ) =>{
      this.tema = resp
      this.alertas.showAlertSuccess( "Tema atualizado com sucesso!" )
      this.router.navigate( ['/tema'] )
    })
  }

  onRetornaTema( )
  {
    this.router.navigate( ['/tema'] )
  }

}




