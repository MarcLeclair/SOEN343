import {Electronic} from "../Models/electronic";

export abstract class ModelModifyStrategy {

    protected modifyElectronicSpecific(elec: Electronic, data): Electronic {
        elec.setWeight(data.weight);
        elec.setBrand(data.brand);
        elec.setPrice(data.price);
        elec.setModelNumber(data.modelNumber);

        return elec;
    }

    public abstract modifyElectronic(elec: Electronic, data): Electronic;

}