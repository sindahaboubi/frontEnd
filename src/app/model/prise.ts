import { PriseKey } from './prise-key';
import { Ordonnance } from './ordonnance';
import { Medicament } from './medicament';
export class Prise {
    id?:PriseKey;
    med?:Medicament;
    ord?:Ordonnance;
    dateprise?:Date;
    datefinprise?:Date;
    prisejour?:number;
    prisemidi?:number;
    prisesoir?:number;
    pris?:boolean;
}
