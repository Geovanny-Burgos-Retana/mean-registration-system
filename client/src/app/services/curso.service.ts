import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Curso } from '../objects/Curso';

@Injectable()
export class CursoService {
    domain: string = 'http://localhost:3000';
    constructor(private http: HttpClient) {} 

    createGrupo(carrera: Curso):Observable<Curso>{    
        return this.http.post<Curso>(`${this.domain}/api/course/create`, carrera)
          .map(res => res);
    }

    readGrupos():Observable<Curso[]>{
        return this.http.get<Curso[]>(`${this.domain}/api/course/get`)
          .map(res => res);
    }

    updateGrupo(user: Curso):Observable<Curso>{
        return this.http.put<Curso>(`${this.domain}/api/course/update`, user)
          .map(res => res);
    }

    deleteGrupo(_id: String):Observable<Curso>{
        return this.http.delete<Curso>(`${this.domain}/api/course/delete/${_id}`)
          .map(res => res);
    }

    readGrupo(nombre: String, numeroGrupo: String):Observable<Curso>{
        return this.http.get<Curso>(`${this.domain}/api/course/get/${nombre}/${numeroGrupo}`)
          .map(res => res);
    }

    readCourseStudent(carnet: String):Observable<Curso[]>{
        return this.http.get<Curso[]>(`${this.domain}/api/course/get/${carnet}`)
          .map(res => res);
    }

    readCourseProfesor(nombre: String):Observable<Curso[]>{
        return this.http.get<Curso[]>(`${this.domain}/api/course/getCursosImpartidosProfesor/${nombre}`)
          .map(res => res);
    }

    readGrupoConID(_id: String):Observable<Curso>{
        return this.http.get<Curso>(`${this.domain}/api/course/getGruopWithId/${_id}`)
          .map(res => res);
    }    
}
