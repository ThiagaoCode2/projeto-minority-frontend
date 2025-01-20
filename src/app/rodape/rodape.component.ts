import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [],
  providers: [BsModalService],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.css'
})
export class RodapeComponent implements OnInit 
{
  constructor( ) { }

  ngOnInit( ): void 
  {  }

}