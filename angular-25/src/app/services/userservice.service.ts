import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reto26, reto26array } from '../models/reto26';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  // Crear una instancia de HttpClient
  constructor(private http: HttpClient) { }

  // Definir la URL (EndPoint) de la API (La BaseURL de la API estara en environment.ts)
  

  // Metodos GET para obtener datos de la API users

  getUsersAll():Observable<Users[]>{
    let apiUser = environment.apiURL + 'vista/';
    return this.http.get<Users[]>(apiUser);
  }
  // Metodo GET para el Interceptor
  getUsersAllInterceptor():Observable<any>{
    let apiUser = environment.apiURL + 'vista/';
    return this.http.get(apiUser, {observe: 'response'});
  }

  getUserId(userId: string): Observable<Users> {
    let apiUser = environment.apiURL + 'buscar/' + userId;
    return this.http.get<Users>(apiUser);
  }

  // Metodo POSt para enviar datos a la API users

  postUser(usuario: Users): Observable<Users>{
    let apiUser = environment.apiURL + 'nuevo/' ;
    return this.http.post<Users>(apiUser, usuario);
  }
  deleteUser(usuarioId: string){
    let apiUser = environment.apiURL + 'delete/'+ usuarioId ;
    return this.http.delete(apiUser, {observe: 'response'})
  }
  postActualizar(usuario: Users): Observable<Users>{
    let apiUser = environment.apiURL + 'actualizar/' ;
    return this.http.post<Users>(apiUser, usuario);
  }
  getReto26All():Observable<reto26array>{
    let apiUser = environment.rutareto26 + 'users/';
    return this.http.get<reto26array>(apiUser);
  }
}
