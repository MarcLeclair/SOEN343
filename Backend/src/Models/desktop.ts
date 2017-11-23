import { ComputerSystem } from "./computersystem";
import { dbconnection } from "./dbconnection";
import { Electronic } from "./electronic";
import {DesktopModifyStrategy} from "../Strategies/desktopmodifystrategy";

var db = new dbconnection().getDBConnector();

export class Desktop extends ComputerSystem {
    private dimensions: string;

    constructor(id: string, weight: number, modelNumber: string, brand: string,
                price: number, decommissioned: boolean, processor: string, ram: number, cpus: number,
                hardDrive: number, os: string, dimensions: string) {
        let electronicType = "Desktop";
        super(id, weight, modelNumber, brand, price, decommissioned, electronicType, processor, ram, cpus, hardDrive, os);
        this.dimensions = dimensions;
        this.setModifyStrategy(new DesktopModifyStrategy());
    }

    /*************************
    * Accessors and Mutators *
     *************************/
    public getDimensions(): string { return this.dimensions; }

    public setDimensions(dimensions: string) { this.dimensions = dimensions; }

    /**************************************************************
    * Method to persist an object of type Desktop to the database *
     **************************************************************/
    public async save(): Promise<boolean> {
        let queryValues = ["'"+this.getId()+"'", this.getWeight(), "'"+this.getModelNumber()+"'",
                           "'"+this.getBrand()+"'", this.getPrice(), "'"+this.getProcessor()+"'",
                           this.getRam(), this.getCpus(), this.getHardDrive(),
                           "'"+this.getOs()+"'", "'"+this.getDimensions()+"'"+this.getDecommissioned()];
        return db.none("INSERT INTO desktops VALUES (" + queryValues.join(',') + ")")
            .then(function() {
                console.log("Desktop added to the database.");
                return true;
            })
            .catch(function (err) {
                console.log("Error adding Desktop to the db: " + err);
                return false;
            });
    }

    /*********************************************************************************************
    * Method to retrieve a persisted object in the database corresponding to the passed id value *
     *********************************************************************************************/
    public static async find(id: string): Promise<Electronic> {
        return db.one("SELECT * FROM desktops WHERE id='" + id + "';")
            .then(function(row) {
                return new Desktop(row.id, row.weight, row.modelnumber,
                                   row.brand, row.price, row.decommissioned, row.processor,
                                   row.ram, row.cpus, row.harddrive,
                                   row.os, row.dimensions)
            }).catch(function (err) {
                console.log("No matching object found: " + err);
                return null;
            });
    }

    /*******************************************************
     * Method to return all desktops saved in the database
     *******************************************************/
    public static async findAll(): Promise<Electronic[]>{
        return db.many('SELECT * FROM desktops;')
            .then(function(rows) {
                let desktops: Electronic[] = new Array<Electronic>();
                for(let i=0; i < rows.length; i++) {
                    if(!rows[i].decommissioned){
                        desktops.push(new Desktop(rows[i].id, rows[i].weight, rows[i].modelnumber,
                            rows[i].brand, rows[i].price, rows[i].decommissioned, rows[i].processor,
                            rows[i].ram, rows[i].cpus, rows[i].harddrive,
                            rows[i].os, rows[i].dimensions));
                    }
                }
                return desktops;
            }).catch(function (err) {
                console.log("There was an error retrieving all desktops: " + err);
                return null;
            });
    }


    /*******************************************************
     * Method to update the current object in the database
     *******************************************************/
    public async modify(): Promise<boolean> {
        return db.none("UPDATE desktops SET weight=" + this.getWeight()
                       + ", modelnumber='" + this.getModelNumber()
                       + "', brand='" + this.getBrand()
                       + "', price=" + this.getPrice()
                       + ", decommissioned=" + this.getDecommissioned()
                       + ", processor='" + this.getProcessor()
                       + "', ram=" + this.getRam()
                       + ", cpus=" + this.getCpus()
                       + ", harddrive=" + this.getHardDrive()
                       + ", os='" + this.getOs()
                       + "', dimensions='" + this.getDimensions()
                       + "' WHERE id = '"+ this.getId() + "';")
            .then(function () {
                console.log("Desktop was modified.");
                return true;
            })
            .catch(function (err) {
                console.log("Could not update desktop: " + err);
                return false;
            });
    }

    /********************************************************
     * Method to remove the current object from the database
     ********************************************************/    
    public async delete(): Promise<boolean> {
        this.setDecommissioned(true);
        return db.none("UPDATE desktops SET decommissioned=" + this.getDecommissioned()
                        + " WHERE id = '"+ this.getId() + "';")
        .then(function () {
            console.log("Desktop was decommissioned");
            return true;
        })
        .catch(function (err) {
            console.log("Could not decommissioned/delete desktop: " + err);
            return false;
        });
    }
}