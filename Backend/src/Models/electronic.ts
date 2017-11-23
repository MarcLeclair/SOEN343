import {ModelModifyStrategy} from "../Strategies/modelmodifystrategy";
import {Igateway} from "./igateway";

enum ElectronicTypes {
    Desktop = "Desktop",
    Laptop = "Laptop",
    Monitor = "Monitor",
    Tablet = "Tablet"
}

export abstract class Electronic implements Igateway{
    protected id: string;
	protected weight: number ;
    protected modelNumber: string;
    protected brand: string;
    protected price: number;
    protected electronicType: string;
    protected decommissioned: boolean;
    static ElectronicTypes = ElectronicTypes;
    private modifyStrategy: ModelModifyStrategy;

    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, decommissioned: boolean, electronicType: string) {

		this.id = id;
		this.weight = weight;
		this.modelNumber = modelNumber;
		this.brand = brand;
        this.price = price;
        this.decommissioned = decommissioned;
        this.electronicType = electronicType;
    }

    public getId(): string{ return this.id;}
    public getWeight(): number { return this.weight;}
    public getModelNumber(): string { return this.modelNumber;}
    public getBrand(): string { return this.brand;}
    public getPrice(): number { return this.price;}
    public getDecommissioned(): boolean { return this.decommissioned; }
    public getElectronicType(): string { return this.electronicType; }
    public getModifyStrategy(): ModelModifyStrategy { return this.modifyStrategy; }

    public setId(id: string): void { this.id = id; }
    public setWeight(weight: number): void { this.weight = weight; }
    public setModelNumber(modelNum: string): void { this.modelNumber = modelNum; }
    public setBrand(brand: string): void { this.brand = brand; }
    public setPrice(price: number): void { this.price = price; }
    public setDecommissioned(decommissioned: boolean): void { this.decommissioned = decommissioned; }
    public setElectronicType(elecType: string): void { this.electronicType = elecType; }
    public setModifyStrategy(modStrat: ModelModifyStrategy) { this.modifyStrategy = modStrat; }


    abstract async save(): Promise<boolean>;
    abstract async modify(): Promise<boolean>;
    abstract async delete(): Promise<boolean>;

}