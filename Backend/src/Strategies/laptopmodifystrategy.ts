import {Electronic} from "../Models/electronic";
import {Laptop} from "../Models/laptop";
import {ComputerModifyStrategy} from "./computermodifystrategy";

export class LaptopModifyStrategy extends ComputerModifyStrategy{

    public modifyElectronic(elec: Electronic, data): Electronic {
        elec = super.modifyComputerSpecific(elec, data);

        let laptop: Laptop = <Laptop> elec;
        laptop.setDisplaySize(parseInt(data.displaySize));
        laptop.setBattery(parseInt(data.battery));
        laptop.setCamera(data.camera == 'true');
        laptop.setTouchscreen(data.touchscreen == 'true');
        
        return laptop;
    }

}