import {Electronic} from "../Models/electronic";
import {ModelModifyStrategy} from "./modelmodifystrategy";
import {ComputerSystem} from "../Models/computersystem";

export abstract class ComputerModifyStrategy extends ModelModifyStrategy{

    protected modifyComputerSpecific(elec: Electronic, data): ComputerSystem {
        elec = super.modifyElectronicSpecific(elec, data);

        let computer: ComputerSystem = <ComputerSystem> elec;
        computer.setProcessor(data.processor);
        computer.setRam(parseInt(data.ram));
        computer.setCpu(parseInt(data.cpus));
        computer.setHardDrive(data.hardDrive);
        computer.setOs(data.os);

        return computer;
    }

    public abstract modifyElectronic(elec: Electronic, data): Electronic;

}