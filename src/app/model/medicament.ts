import { Unite } from "./unite";
import { Utilisateur } from "./utilisateur";

export class Medicament {

    id?:number;
    nom?:string;
    description?:string;
    img?:string;
    dateExpiration?:Date;
    prix?:number;
    quantite?:number;
    fabricant?:string;
    dosage?:number;
    unite?:Unite;
   

}
