import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

 // TROCAR END POINTS APÒS DEPLOY BACKEND -- THIAGO
 entrar( usuarioLogin: UsuarioLogin ): Observable<UsuarioLogin>
 {
   return this.http.post<UsuarioLogin>( 'http://localhost:8080/usuarios/logar', usuarioLogin )
 }

 cadastrar( usuario: Usuario ): Observable<Usuario>
 {
   return this.http.post<Usuario>( 'http://localhost:8080/usuarios/cadastrar', usuario )
 }

 getByIdUsuario( id: number ): Observable<Usuario>
 {
   return this.http.get<Usuario>( `http://localhost:8080/usuarios/${id}` )
 }


  logado(){
    let ok = false // == let ok: boolean = false ---> pode ser escrita com mais tipagem
    
    if(environment.token != ''){
      ok = true
    }

    return ok
  }

  adm(){
    let ok = false // == let ok: boolean = false ---> pode ser escrita com mais tipagem
    
    if(environment.tipo == 'admin'){
      ok = true
    }

    return ok
  }

  



}
