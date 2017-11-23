import {Electronic} from "../Models/electronic";
import {ModelFilterProductStrategy} from "./modelfilterproductstrategy";

export class TypeFilterProductStrategy extends ModelFilterProductStrategy{

    public filterProduct(products: Electronic[], type): Electronic[] {

        let desired: Electronic[] = [];
        for (var i = 0; i < products.length; i++) {

            if(products[i].getElectronicType() == type){
                desired.push(products[i]);
            }
        }
        return desired;
    }

}