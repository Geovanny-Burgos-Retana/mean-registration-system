import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Mensaje } from '../objects/Mensaje';

@Injectable()
export class ForoService {
	domain: string = 'http://localhost:3000';
	constructor(private http: HttpClient) { }

	create(mensajes: Mensaje[]):Observable<Mensaje[]>{
        return this.http.post<Mensaje[]>(`${this.domain}/api/foro/create`, mensajes)
          .map(res => res);
    }

    readMensajesGrupo(idGrupo: String):Observable<Mensaje[]>{
    	console.log(`${this.domain}/api/foro/get/${idGrupo}`);
        return this.http.get<Mensaje[]>(`${this.domain}/api/foro/get/${idGrupo}`)
          .map(res => res);
    }
}
