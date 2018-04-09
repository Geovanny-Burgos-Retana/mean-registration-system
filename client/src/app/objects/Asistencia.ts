import { ItemAsistencia } from './ItemAsistencia';

export class Asistencia {
	_id?:String;
	grupo: String;
	carnet: String;
	asistencias: ItemAsistencia[];
}