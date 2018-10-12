import {Cliente} from './cliente';
import {Estado} from './estado';
import {Caracteristica} from './caracteristica';

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
  public caracteristica1: Caracteristica;
  public caracteristica2: Caracteristica;
  public caracteristica3: Caracteristica;
  public caracteristica4: Caracteristica;
  public caracteristica5: Caracteristica;
  public caracteristica6: Caracteristica;
  public caracteristica7: Caracteristica;
  public caracteristica8: String;
  public caracteristica9: String;
  public caracteristica10: String;

}
