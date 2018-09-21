import {Cliente} from './cliente';
import {Estado} from './estado';

export class Movimiento {

  public _id: String;
  public baja: boolean;
  public cliente: Cliente;
  public estado: Estado;
  public fechaAlta: Date;
  public idMov: Number;

}
