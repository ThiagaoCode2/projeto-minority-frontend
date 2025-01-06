import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertasComponent } from '../alertas/alertas.component';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AlertasService 
{
  private bsModalService!: BsModalService;

  constructor(
    private injector: Injector,
    @Inject( PLATFORM_ID ) private platformId: Object
  ) 
  {
    if( isPlatformBrowser( this.platformId ) ) 
    {
      // Apenas inicializa o BsModalService no cliente (navegador)
      this.bsModalService = this.injector.get( BsModalService );
    }
  }

  private showAlert( message: string, type: string ) 
  {
    if( this.bsModalService ) 
    {
      const bsModalRef: BsModalRef = this.bsModalService.show( AlertasComponent );
      bsModalRef.content.type = type;
      bsModalRef.content.message = message;
    }
  }

  showAlertDanger( message: string ) 
  {
    this.showAlert( message, 'danger' );
  }

  showAlertSuccess( message: string ) 
  {
    this.showAlert( message, 'success' );
  }

  showAlertInfo( message: string ) 
  {
    this.showAlert( message, 'info' );
  }
}
