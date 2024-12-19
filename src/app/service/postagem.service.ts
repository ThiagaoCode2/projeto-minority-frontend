import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService 
{
  constructor( private http: HttpClient ) { }

  token = {
    headers: new HttpHeaders( ).set( 'Authorization', environment.token )
  }

  // TROCAR END POINTS APÒS DEPLOY BACKEND -- THIAGO
  getAllPostagens(): Observable<Postagem[]>
  {
    return this.http.get<Postagem[]>( "http://localhost:8080/postagens" )
  }

  getByIdPostagem( id: number ): Observable<Postagem>
  {
    return this.http.get<Postagem>( `http://localhost:8080/postagens/${id}` )
  }

  getByTituloPostagem( titulo: string ): Observable<Postagem[]>
  {
    return this.http.get<Postagem[]>( `http://localhost:8080/postagens/titulo/${titulo}` )
  }


  postPostagem( postagem: Postagem ): Observable<Postagem>
  {
    return this.http.post<Postagem>( "http://localhost:8080/postagens/salvar", postagem )
  }

  putPostagem( postagem: Postagem ): Observable<Postagem>
  {
    return this.http.put<Postagem>( "http://localhost:8080/postagens/alterar", postagem )
  }

  deletePostagem( id: number )
  {
    return this.http.delete<Postagem>( `http://localhost:8080/postagens/deletar/${id}` )
  }
}