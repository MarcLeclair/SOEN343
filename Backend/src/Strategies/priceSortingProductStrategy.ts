import {Electronic} from "../Models/electronic";
import {ModelSortingProductStrategy} from "./modelsortingproductstrategy";

export class PriceSortingProductStrategy extends ModelSortingProductStrategy{

    public sortProduct(products: Electronic[], priceSort): Electronic[] {

        let desired: Electronic[];
        products.sort(function(a, b) {
            return (a.getPrice() - b.getPrice());
        });
        if(priceSort == 'desc'){
            products.reverse();
        }
        desired = products;
        return desired;
    }

}