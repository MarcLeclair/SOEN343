import {Electronic} from "../Models/electronic";
import {ModelModifyStrategy} from "./modelmodifystrategy";
import {Monitor} from "../Models/monitor";

export class MonitorModifyStrategy extends ModelModifyStrategy{

    public modifyElectronic(elec: Electronic, data): Electronic {
        elec = super.modifyElectronicSpecific(elec, data);

        let monitor: Monitor = <Monitor> elec;
        let modifySuccess: boolean;
        monitor.setSize(data.size);

        return monitor;
    }

}