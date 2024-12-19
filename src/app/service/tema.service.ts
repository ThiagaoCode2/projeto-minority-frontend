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
    return this.http.get<Tema[]>( "http://localhost:8080/tema" ) 
  }

  getByIdTema( id: number ): Observable<Tema>
  {
    return this.http.get<Tema>( `http://localhost:8080/tema/${id}` )
  }

  getByNomeTema( nome: string ): Observable<Tema[]>
  {
    return this.http.get<Tema[]>( `http://localhost:8080/tema/nome/${nome}` )
  }

  postTema( tema: Tema ): Observable<Tema>
  {
    return this.http.post<Tema>( "http://localhost:8080/tema", tema )
  }

  putTema( tema: Tema ): Observable<Tema>
  {
    return this.http.put<Tema>( "http://localhost:8080/tema", tema )
  }

  deleteTema( id: number )
  {
    return this.http.delete( `http://localhost:8080/tema/${id}` )
  }

}