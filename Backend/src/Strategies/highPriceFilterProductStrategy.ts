import {Electronic} from "../Models/electronic";
import {ModelFilterProductStrategy} from "./modelfilterproductstrategy";

export class HighPriceFilterProductStrategy extends ModelFilterProductStrategy{

    public filterProduct(products: Electronic[], priceHigh): Electronic[] {

        let desired: Electronic[] = [];
        for (var i = 0; i < products.length; i++) {
            if(products[i].getPrice() <= priceHigh)
                desired.push(products[i]);
        }
        return desired;
    }
}