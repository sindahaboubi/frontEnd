import { Pipe, PipeTransform } from "@angular/core";
import { Medicament } from "src/app/model/medicament";

@Pipe({
    name:"medicamentFilter",
})
export class MedicamentFilter implements PipeTransform{
    transform(meds:Medicament[],medSearch:string) : Medicament[]{
        if(! meds || ! medSearch) return meds;
        return meds.filter(m => m.nom.toLowerCase().indexOf(medSearch.toLowerCase())!=-1);
    }
    
}