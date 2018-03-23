import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Carrera } from '../objects/Carrera';

@Injectable()
export class CarreraService {
	domain: string = 'http://localhost:3000';
	constructor(private http: HttpClient) { }


    createMalla(carrera: Carrera):Observable<Carrera>{    
        return this.http.post<Carrera>(`${this.domain}/api/curriculum/create`, carrera)
          .map(res => res);
    }

    readMallas():Observable<Carrera[]>{
        return this.http.get<Carrera[]>(`${this.domain}/api/curriculum/get`)
          .map(res => res);
    }

    updateMalla(user: Carrera):Observable<Carrera>{
        return this.http.put<Carrera>(`${this.domain}/api/curriculum/update`, user)
          .map(res => res);
    }

    deleteMalla(_id: String):Observable<Carrera>{
        return this.http.delete<Carrera>(`${this.domain}/api/curriculum/delete/${_id}`)
          .map(res => res);
    }

    readMalla(nombre: String):Observable<Carrera>{
        return this.http.get<Carrera>(`${this.domain}/api/curriculum/get/${nombre}`)
          .map(res => res);
    }

    /*
	  getCarrera(name):Observable<Carrera>{
  		return this.http.get<Carrera>(`${this.domain}/api/carreras/${name}`)
  			.map(res => res);
  	}

    getCarreras():Observable<Carrera[]>{
      return this.http.get<Carrera[]>(`${this.domain}/api/carreras`)
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
  	*/
}
