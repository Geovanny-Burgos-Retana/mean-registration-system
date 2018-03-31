import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Materia } from '../objects/Materia';

@Injectable()
export class MateriaService {
	  domain: string = 'http://localhost:3000';
    constructor(private http: HttpClient) {} 

    createMaterias(materias: Materia[]):Observable<Materia[]>{    
        return this.http.post<Materia[]>(`${this.domain}/api/subject/create`, materias)
          .map(res => res);
    }

    readMaterias():Observable<Materia[]>{
        return this.http.get<Materia[]>(`${this.domain}/api/subject/get`)
          .map(res => res);
    }

    updateMateria(materia: Materia):Observable<Materia>{
        return this.http.put<Materia>(`${this.domain}/api/subject/update`, materia)
          .map(res => res);
    }

    deleteMateria(_id: String):Observable<Materia>{
        return this.http.delete<Materia>(`${this.domain}/api/subject/delete/${_id}`)
          .map(res => res);
    }

    readMateriasGrupo(carrera: String):Observable<Materia[]>{
        return this.http.get<Materia[]>(`${this.domain}/api/subject/get/${carrera}`)
          .map(res => res);
    }

    readMateriaGrupo(carrera: String, materia: String):Observable<Materia[]>{
        return this.http.get<Materia[]>(`${this.domain}/api/subject/get/${carrera}/${materia}`)
          .map(res => res);
    }

    deleteSubjectsForCareer(carrera: String):Observable<Materia[]>{
        return this.http.delete<Materia[]>(`${this.domain}/api/subject/deleteForCareer/${carrera}`)
          .map(res => res);
    }
}
