import { Utilisateur } from "./utilisateur";
export class Ordonnance {
    idOrd?:number;
    utilisateur?:Utilisateur;
    piece_jointe?:string;
    dateInsertion?:Date;
}
