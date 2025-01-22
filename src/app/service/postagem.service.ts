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
    return this.http.get<Postagem[]>( 'https://projeto-minority-backend.onrender.com/postagens' )
  }

  getByIdPostagem( id: number ): Observable<Postagem>
  {
    return this.http.get<Postagem>( `https://projeto-minority-backend.onrender.com/postagens/${id}` )
  }

  getByTituloPostagem( titulo: string ): Observable<Postagem[]>
  {
    return this.http.get<Postagem[]>( `https://projeto-minority-backend.onrender.com/postagens/titulo/${titulo}` )
  }


  postPostagem( postagem: Postagem ): Observable<Postagem>
  {
    return this.http.post<Postagem>( 'https://projeto-minority-backend.onrender.com/postagens/salvar', postagem )
  }

  putPostagem( postagem: Postagem ): Observable<Postagem>
  {
    return this.http.put<Postagem>( 'https://projeto-minority-backend.onrender.com/postagens/alterar', postagem )
  }

  deletePostagem( id: number )
  {
    return this.http.delete<Postagem>( `https://projeto-minority-backend.onrender.com/postagens/deletar/${id}` )
  }
}