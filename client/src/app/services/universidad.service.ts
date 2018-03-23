import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


import { Universidad } from '../objects/Universidad';

@Injectable()
export class UniversidadService {
    domain: string = 'http://localhost:3000';

  	constructor(private http:HttpClient) { }

    createUniversidad(Universidad: Universidad):Observable<Universidad>{    
        return this.http.post<Universidad>(`${this.domain}/api/university/create`, Universidad)
          .map(res => res);
    }

    readUniversidades():Observable<Universidad[]>{
        console.log(`${this.domain}/api/university/get`);
        return this.http.get<Universidad[]>(`${this.domain}/api/university/get`)
          .map(res => res);
    }

    updateUniversidad(Universidad: Universidad):Observable<Universidad>{
        return this.http.put<Universidad>(`${this.domain}/api/university/update`, Universidad)
          .map(res => res);
    }

    deleteUniversidad(_id: String):Observable<Universidad>{
        return this.http.delete<Universidad>(`${this.domain}/api/university/delete/${_id}`)
          .map(res => res);
    }

    readUniversidad(nombre: String):Observable<Universidad>{
        return this.http.get<Universidad>(`${this.domain}/api/university/get/${nombre}`)
          .map(res => res);
    }

    readUniversidadEscuela(nombre: String, escuela: String):Observable<Universidad>{
        return this.http.get<Universidad>(`${this.domain}/api/university/get/${nombre}/${escuela}`)
          .map(res => res);
    }

/*
	getUniveridades():Observable<Universidad[]>{
  		console.log(this.http.get<Universidad[]>(`${this.domain}/universidades/universidad/universidades`)
  			.map(res => res));
  		return this.http.get<Universidad[]>(`${this.domain}/api/universidades`)
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
*/
}
