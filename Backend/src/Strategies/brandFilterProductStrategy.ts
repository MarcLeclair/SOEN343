import {Electronic} from "../Models/electronic";
import {ModelFilterProductStrategy} from "./modelfilterproductstrategy";

export class BrandFilterProductStrategy extends ModelFilterProductStrategy{

    public filterProduct(products: Electronic[], brand): Electronic[] {

        let desired: Electronic[] = [];
        for (var i = 0; i < products.length; i++) {

            if(products[i].getBrand() == brand){
                desired.push(products[i]);
            }
        }
        return desired;
    }
}