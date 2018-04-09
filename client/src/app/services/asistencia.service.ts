import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Asistencia } from '../objects/Asistencia';

@Injectable()
export class AsistenciaService {

  	domain: string = 'http://localhost:3000';
    constructor(private http: HttpClient) {} 

    create(asistencias: Asistencia):Observable<Asistencia>{    
        return this.http.post<Asistencia>(`${this.domain}/api/assistance/create`, asistencias)
          .map(res => res);
    }

    delete(idGrupo: String, carnet: String):Observable<Asistencia>{
        console.log(`${this.domain}/api/assistance/delete_group_carnet/${idGrupo}/${carnet}`);
        return this.http.delete<Asistencia>(`${this.domain}/api/assistance/delete_group_carnet/${idGrupo}/${carnet}`)
          .map(res => res);
    }

    update(asistencia: Asistencia):Observable<Asistencia>{
        return this.http.put<Asistencia>(`${this.domain}/api/assistance/update`, asistencia)
          .map(res => res);
    }

    readAsistenciasGrupoEstudiante(idGrupo: String, carnet : String):Observable<Asistencia>{
        return this.http.get<Asistencia>(`${this.domain}/api/assistance/get/assistanceGrupoCarnet/${idGrupo}/${carnet}`)
          .map(res => res);
    }

}