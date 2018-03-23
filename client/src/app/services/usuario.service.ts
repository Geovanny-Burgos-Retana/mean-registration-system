import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import { User } from '../objects/Usuario';

@Injectable()
export class UsuarioService {
	domain: string = 'http://localhost:3000';

	constructor(private http: HttpClient) { }

  createUsuario(user: User):Observable<User>{    
    return this.http.post<User>(`${this.domain}/api/user/create`, user)
      .map(res => res);
  }

  readUsuarios():Observable<User[]>{
    return this.http.get<User[]>(`${this.domain}/api/user/get`)
      .map(res => res);
  }
  
  updateUsuario(user: User):Observable<User>{
    return this.http.put<User>(`${this.domain}/api/user/update`, user)
      .map(res => res);
  }

  deleteUsuario(_id: String):Observable<User>{
    return this.http.delete<User>(`${this.domain}/api/user/delete/${_id}`)
      .map(res => res);
  }

  readUsuario(usuario: String, contrasena: String):Observable<User>{
    return this.http.get<User>(`${this.domain}/api/user/get/${usuario}/${contrasena}`)
      .map(res => res);
  }

  readUsuarioName(nombre: String):Observable<User>{
    return this.http.get<User>(`${this.domain}/api/user/get/${nombre}`)
      .map(res => res);
  }
  /*
	getUsuario(name, pass):Observable<User>{  		
  		console.log(name);
  		console.log(pass);
  		console.log(`${this.domain}/api/usuario/${name}/${pass}`);
  		return this.http.get<User>(`${this.domain}/api/users/${name}/${pass}`)
  			.map(res => res);
  	}

    getUsuarioNombre(name):Observable<User>{
      return this.http.get<User>(`${this.domain}/api/users/${name}`)
        .map(res => res);
    }

  	addUsuario(newUsuario: User) {
    return this.http.post<User>(`${this.domain}/api/users`, newUsuario)
      	.map(res => res);
  	}

  	updateUsuario(newUsuario) {
    return this.http.put<User>(`${this.domain}/api/users/${newUsuario._id}`, newUsuario)
      .map(res => res)
  	}
  */
}
