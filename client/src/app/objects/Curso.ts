import { Asignacion } from './Asignacion';

export class Curso{
	_id?: String;
	nombre: String;
	numeroGrupo: String;
	profesor: String;
	estudiantes: String[];
  	horario: String;
  	universidad: String;
  	asignaciones: Asignacion[];
  	isRegistration?:Boolean;
}