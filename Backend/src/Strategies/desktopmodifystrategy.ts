import {Electronic} from "../Models/electronic";
import {Desktop} from "../Models/desktop";
import {ComputerModifyStrategy} from "./computermodifystrategy";

export class DesktopModifyStrategy extends ComputerModifyStrategy{

    public modifyElectronic(elec: Electronic, data): Electronic {
        elec = super.modifyComputerSpecific(elec, data);

        let desktop: Desktop = <Desktop> elec;
        desktop.setDimensions(data.dimensions);

        return desktop;
    }

}