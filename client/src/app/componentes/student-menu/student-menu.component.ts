import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';

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

	constructor(private router:Router, private recievedData: ActivatedRoute) {
		this.recievedData.queryParams.subscribe(params => {
			this._id = params["_id"];
            this.nombre = params["nombre"];
            this.carnet = params["carnet"];
        });
	}

	ngOnInit() {

	}

	matricula() {
		const navigationExtras: NavigationExtras = {
            queryParams: {
            	"_id": this._id,
            	"nombre": this.nombre,
            	"carnet": this.carnet
            }
        };
        this.router.navigate(['registration'], navigationExtras);
	}

}
