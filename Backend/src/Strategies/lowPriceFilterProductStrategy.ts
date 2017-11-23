import {Electronic} from "../Models/electronic";
import {ModelFilterProductStrategy} from "./modelfilterproductstrategy";

export class LowPriceFilterProductStrategy extends ModelFilterProductStrategy{

    public filterProduct(products: Electronic[], priceLow): Electronic[] {

        let desired: Electronic[] = [];
        for (var i = 0; i < products.length; i++) {
            if(products[i].getPrice() >= priceLow)
                desired.push(products[i]);
        }
        return desired;
    }
}