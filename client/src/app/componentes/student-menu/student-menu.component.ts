import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';

import { User } from '../../objects/Usuario';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.component.html',
  styleUrls: ['./student-menu.component.css']
})
export class StudentMenuComponent implements OnInit {

	_id: String;
	carnet: String;
	nombre: String;
    carrera: String;
    escuela: String;
    universidad: String;

    user: User;

	constructor(private router:Router, private recievedData: ActivatedRoute) {
        this.user = {
            _id:'',
            nombre:'',
            carnet:'',
            universidad:'',
            escuela:'',
            carrera:'',
            usuario:'',
            contrasena:'',
            tipo:''
        };
		this.recievedData.queryParams.subscribe(params => {
			this.user._id = params["_id"];
            this.user.nombre = params["nombre"];
            this.user.carnet = params["carnet"];
            this.user.escuela = params["escuela"];
            this.user.carrera = params["carrera"];
            this.user.universidad = params["universidad"];
        });
	}

	ngOnInit() {

	}

	matricula() {
		const navigationExtras: NavigationExtras = {
            queryParams: {
                "_id": this.user._id,
                "nombre": this.user.nombre,
                "carnet": this.user.carnet,
                "carrera": this.user.carrera,
                "escuela": this.user.escuela,
                "universidad": this.user.universidad                            
            }
        };
        this.router.navigate(['registration'], navigationExtras);
	}

}
