import {Electronic} from "../Models/electronic";
import {Tablet} from "../Models/tablet";
import {ComputerModifyStrategy} from "./computermodifystrategy";

export class TabletModifyStrategy extends ComputerModifyStrategy{

    public modifyElectronic(elec: Electronic, data): Electronic {
        elec = super.modifyComputerSpecific(elec, data);

        let tablet: Tablet = <Tablet> elec;

        tablet.setDimensions(data.dimensions);
        tablet.setBattery(parseInt(data.battery));
        tablet.setDisplaySize(parseInt(data.displaySize));
        tablet.setCamera(data.camera == 'true');

        return tablet;
    }

}