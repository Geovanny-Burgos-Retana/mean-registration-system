import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import { User } from '../objects/Usuario';

@Injectable()
export class LoginService {
  	domain: string = 'http://localhost:3000';

  	constructor(private http: HttpClient) { }

  	getUser(name, pass):Observable<User>{  		
  		console.log(name);
  		console.log(pass);
  		console.log(`${this.domain}/api/users/${name}/${pass}`);
  		return this.http.get<User>(`${this.domain}/api/users/${name}/${pass}`)
  			.map(res => res);
  	}

  	addUser(newUser: User) {
    return this.http.post<User>(`${this.domain}/api/users`, newUser)
      	.map(res => res);
  	}


  	
}
