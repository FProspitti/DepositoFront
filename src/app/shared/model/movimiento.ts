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
  public fechaRegistro: Date;
  public fechaSalida: Date;
  public fecha: Date;
  public idMov: Number;
  public cantDias: Number;
  public codigoBarras: String;
  public caracteristicas1: Caracteristica;
  public caracteristicas2: Caracteristica;
  public caracteristicas3: Caracteristica;
  public caracteristicas4: Caracteristica;
  public caracteristicas5: Caracteristica;
  public caracteristicas6: Caracteristica;
  public caracteristicas7: Caracteristica;
  public caracteristicas8: String;
  public caracteristicas9: String;
  public caracteristicas10: String;

}
