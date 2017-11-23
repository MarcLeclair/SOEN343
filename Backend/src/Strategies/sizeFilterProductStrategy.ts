import {Electronic} from "../Models/electronic";
import { Monitor } from "../Models/monitor"
import { Tablet } from "../Models/tablet";
import { Laptop } from "../Models/laptop";
import {ModelFilterProductStrategy} from "./modelfilterproductstrategy";

export class SizeFilterProductStrategy extends ModelFilterProductStrategy{

    public filterProduct(products: Electronic[], maxSize): Electronic[] {

        let desired: Electronic[] = [];
        var type;
        for (var i = 0; i < products.length; i++) {
            type = products[i].getElectronicType();
            let eSize;
            switch(type){
                case "Monitor":
                    eSize = (products[i] as Monitor).getSize();
                    break;
                case "Laptop":
                    eSize = (products[i] as Laptop).getDisplaySize();
                    break;
                case "Tablet":
                    eSize = (products[i] as Tablet).getDisplaySize();
                    break;
                default:
                    eSize = 1000000;
            }
            if(eSize <= maxSize)
                desired.push(products[i]);
        }
        return desired;
    }
}