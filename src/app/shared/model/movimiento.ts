import {Cliente} from './cliente';
import {Estado} from './estado';

export class Movimiento {

  public _id: String;
  public baja: boolean;
  public cliente: Cliente;
  public estado: Estado;
  public fechaAlta: Date;
  public fechaIngreso: Date;
  public fechaSalida: Date;
  public fecha: Date;
  public idMov: Number;
  public cantDias: Number;
  public codigoBarras: String;

}
