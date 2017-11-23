import {Electronic} from "../Models/electronic";
import {ModelFilterProductStrategy} from "./modelfilterproductstrategy";

export class WeightFilterProductStrategy extends ModelFilterProductStrategy{

    public filterProduct(products: Electronic[], maxWeight): Electronic[] {

        let desired: Electronic[] = [];
        for (var i = 0; i < products.length; i++) {
            if(products[i].getWeight() <= maxWeight)
                desired.push(products[i]);
        }
        return desired;
    }
}