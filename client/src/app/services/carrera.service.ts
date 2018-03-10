import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import { Carrera } from '../objects/Carrera';

@Injectable()
export class CarreraService {
	domain: string = 'http://localhost:3000';
	constructor(private http: HttpClient) { }

	getCarrera(name, pass):Observable<Carrera>{  		
  		console.log(name);
  		console.log(pass);
  		console.log(`${this.domain}/api/carrera/${name}/${pass}`);
  		return this.http.get<Carrera>(`${this.domain}/api/carrera/${name}/${pass}`)
  			.map(res => res);
  	}

  	addCarrera(newCarrera: Carrera) {
    return this.http.post<Carrera>(`${this.domain}/api/carrera`, newCarrera)
      	.map(res => res);
  	}

  	updateCarrera(newCarrera) {
    return this.http.put<Carrera>(`${this.domain}/api/carrera/${newCarrera._id}`, newCarrera)
      .map(res => res)
  	}
  	
}
