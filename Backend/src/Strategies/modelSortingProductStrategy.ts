import {Electronic} from "../Models/electronic";

export abstract class ModelSortingProductStrategy{

    public abstract sortProduct(products: Electronic[], data): Electronic[];

}