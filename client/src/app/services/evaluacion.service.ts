import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Evaluacion } from '../objects/Evaluacion';

@Injectable()
export class EvaluacionService {
	  domain: string = 'http://localhost:3000';
    constructor(private http: HttpClient) {} 

    create(evaluaciones: Evaluacion):Observable<Evaluacion>{    
        return this.http.post<Evaluacion>(`${this.domain}/api/assignment/create`, evaluaciones)
          .map(res => res);
    }

    delete(idGrupo: String, carnet: String):Observable<Evaluacion>{
        return this.http.delete<Evaluacion>(`${this.domain}/api/assignment/delete_group_carnet/${idGrupo}/${carnet}`)
          .map(res => res);
    }

    update(evaluacion: Evaluacion):Observable<Evaluacion>{
        return this.http.put<Evaluacion>(`${this.domain}/api/assignment/update`, evaluacion)
          .map(res => res);
    }

    readEvaluacionesGrupoEstudiante(idGrupo: String, carnet : String):Observable<Evaluacion>{
        return this.http.get<Evaluacion>(`${this.domain}/api/assignment/get/assignmentGrupoCarnet/${idGrupo}/${carnet}`)
          .map(res => res);
    }

}
