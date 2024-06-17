import { Id } from "./id";
import { Medicament } from "./medicament";
import { Utilisateur } from "./utilisateur";

export class Consomation {

    id?:Id;
    med?:Medicament;
    pat?:Utilisateur;
    qte_stock?:number= 0;


}
