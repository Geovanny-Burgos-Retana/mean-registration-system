import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import { User } from '../objects/Usuario';

@Injectable()
export class UsuarioService {
	domain: string = 'http://localhost:3000';

	constructor(private http: HttpClient) { }

	getUsuario(name, pass):Observable<User>{  		
  		console.log(name);
  		console.log(pass);
  		console.log(`${this.domain}/api/usuario/${name}/${pass}`);
  		return this.http.get<User>(`${this.domain}/api/usuario/${name}/${pass}`)
  			.map(res => res);
  	}

  	addUsuario(newUsuario: User) {
    return this.http.post<User>(`${this.domain}/api/usuario`, newUsuario)
      	.map(res => res);
  	}

  	updateUsuario(newUsuario) {
    return this.http.put<User>(`${this.domain}/api/usuarios/${newUsuario._id}`, newUsuario)
      .map(res => res)
  	}

}
