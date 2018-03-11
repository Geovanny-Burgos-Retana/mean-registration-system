import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


import { Curso } from '../objects/Curso';





@Injectable()
export class CursoService {
  domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {} 
    
    getCurso(name, pass):Observable<Curso>{  		
  		console.log(name);
  		console.log(pass);
  		console.log(`${this.domain}/api/users/${name}/${pass}`);
  		return this.http.get<Curso>(`${this.domain}/api/users/${name}/${pass}`)
  			.map(res => res);
  	}

  	addCurso(newCurso: Curso) {
    return this.http.post<Curso>(`${this.domain}/api/users`, newCurso)
      	.map(res => res);
  	}
   
    updateCurso(newCurso) {
      return this.http.put<Curso>('${this.domain}/api/Curso/${newCurso._id}', newCurso)
        .map(res => res)
    }


}
