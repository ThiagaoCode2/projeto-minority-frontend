import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  imports: [],
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css'
})
export class AlertasComponent implements OnInit
{
  @Input() message: string | undefined
  @Input() type: string = "success"

  constructor( public modal: BsModalRef ) 
  {

  }

  ngOnInit( )
  {

  }

  onClose( )
  {
    this.modal.hide( )
  }

}