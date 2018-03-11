import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


import { Universidad } from '../objects/Universidad';

@Injectable()
export class UniversidadService {
	domain: string = 'http://localhost:3000';

	constructor(private http:HttpClient) { }

	getUniveridades():Observable<Universidad[]>{
  		console.log(this.http.get<Universidad[]>(`${this.domain}/universidades/universidad/universidades`)
  			.map(res => res));
  		return this.http.get<Universidad[]>(`${this.domain}/api/universidades/universidades`)
  			.map(res => res);
  	}

  	getUniversidad(name):Observable<Universidad>{
  		return this.http.get<Universidad>(`${this.domain}/api/universidades/${name}`)
  			.map(res => res);
  	}


  	addUniversidad(newUniversidad: Universidad) {
    return this.http.post<Universidad>(`${this.domain}/api/universidades`, newUniversidad)
      	.map(res => res);
  	}

  	updateUniversidad(newUniversidad) {
    return this.http.put<Universidad>(`${this.domain}/api/universidades/update`, newUniversidad)
      .map(res => res)
  	}

}
