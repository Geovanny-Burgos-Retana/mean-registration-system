import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import { Secion } from '../objects/Secion';
@Injectable()
export class SecionService {
	domain: string = 'http://localhost:3000';
	constructor( private http: HttpClient) { }

	getSecion(name, pass):Observable<Secion>{  		
  		console.log(name);
  		console.log(pass);
  		console.log(`${this.domain}/api/secion/${name}/${pass}`);
  		return this.http.get<Secion>(`${this.domain}/api/secion/${name}/${pass}`)
  			.map(res => res);
  	}



  	getUsuarioNombre(name):Observable<Secion>{
      return this.http.get<Secion>(`${this.domain}/api/secion/${name}`)
        .map(res => res);
    }


    addSecion(newSecion: Secion) {
    console.log("servicio addSecion:"+ newSecion.usuario);
    return this.http.post<Secion>(`${this.domain}/api/secion`, newSecion)
      	.map(res => res);
  	}


  	updateSecion(newSecion) {
    return this.http.put<Secion>(`${this.domain}/api/secion/${newSecion._id}`, newSecion)
      .map(res => res)
  	}

}
