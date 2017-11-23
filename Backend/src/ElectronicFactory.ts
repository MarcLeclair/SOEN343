import { Electronic } from "./Models/electronic"
import { Monitor } from "./Models/monitor"
import {Desktop} from "./Models/desktop";
import {Tablet} from "./Models/tablet";
import {Laptop} from "./Models/laptop";
import * as uuid from "uuid";

export class ElectronicFactory{

    constructor() {   }
    public create(data): Electronic {
        switch(data.electronicType)
        {

            case "Monitor":
                return new Monitor(uuid.v1(), Number(data.weight), data.modelNumber, data.brand,parseFloat(data.price), data.decommissioned =='true', parseInt(data.size));
            case "Desktop":
                return new Desktop(uuid.v1(), Number(data.weight), data.modelNumber, data.brand, parseFloat(data.price),data.decommissioned =='true', data.processor, parseInt(data.ram), parseInt(data.cpus), parseInt(data.hardDrive), data.os, data.dimensions);
            case "Laptop":
                return new Laptop(uuid.v1(), Number(data.weight), data.modelNumber, data.brand, parseFloat(data.price),data.decommissioned =='true', data.processor, parseInt(data.ram),  parseInt(data.cpus),
                    parseInt(data.hardDrive), data.os, parseFloat(data.displaySize), parseInt(data.battery), data.camera == 'true', data.touchscreen =='true');
            case "Tablet":
                return new Tablet(uuid.v1(), Number(data.weight), data.modelNumber, data.brand,parseFloat(data.price),data.decommissioned =='true', data.processor, parseInt(data.ram),
                    parseInt(data.cpus), parseInt(data.hardDrive), data.os, parseFloat(data.displaySize), data.dimensions, parseInt(data.battery), data.camera=='true');
            default:
                console.log("Unknown electronic type. Electronic not created");
                return null;
        }
    }
}