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
  		console.log(this.http.get<Universidad[]>(`${this.domain}/universidad/universidad/universidades`)
  			.map(res => res));
  		return this.http.get<Universidad[]>(`${this.domain}/api/universidad/universidades`)
  			.map(res => res);
  	}


  	addUniversidad(newUniversidad: Universidad) {
    return this.http.post<Universidad>(`${this.domain}/api/universidad`, newUniversidad)
      	.map(res => res);
  	}

  	updateUniversidad(newUniversidad) {
    return this.http.put<Universidad>(`${this.domain}/api/universidad/${newUniversidad._id}`, newUniversidad)
      .map(res => res)
  	}

}
