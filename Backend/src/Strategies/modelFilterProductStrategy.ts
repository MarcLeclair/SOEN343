import {Electronic} from "../Models/electronic";

export abstract class ModelFilterProductStrategy{

    public abstract filterProduct(products: Electronic[], data): Electronic[];

}
