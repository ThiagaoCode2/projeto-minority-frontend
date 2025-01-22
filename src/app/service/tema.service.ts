import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService 
{
  constructor( private http: HttpClient ) { }

  token = {
    headers: new HttpHeaders( ).set( 'Authorization', environment.token )
  }

  // TROCAR END POINTS APÒS DEPLOY BACKEND -- THIAGO
  getAllTema(): Observable<Tema[]> 
  {
    return this.http.get<Tema[]>( 'https://projeto-minority-backend.onrender.com/tema' ) 
  }

  getByIdTema( id: number ): Observable<Tema>
  {
    return this.http.get<Tema>( `https://projeto-minority-backend.onrender.com/tema/${id}` )
  }

  getByNomeTema( nome: string ): Observable<Tema[]>
  {
    return this.http.get<Tema[]>( `https://projeto-minority-backend.onrender.com/tema/nome/${nome}` )
  }

  postTema( tema: Tema ): Observable<Tema>
  {
    return this.http.post<Tema>( 'https://projeto-minority-backend.onrender.com/tema', tema )
  }

  putTema( tema: Tema ): Observable<Tema>
  {
    return this.http.put<Tema>( 'https://projeto-minority-backend.onrender.com/tema', tema )
  }

  deleteTema( id: number )
  {
    return this.http.delete( `https://projeto-minority-backend.onrender.com/tema/${id}` )
  }

}