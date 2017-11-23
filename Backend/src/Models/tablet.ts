import {ComputerSystem} from "./computersystem";
import {dbconnection} from "./dbconnection";
import {Electronic} from "./electronic";
import uuid = require("uuid");
import {TabletModifyStrategy} from "../Strategies/tabletmodifystrategy";

var db = new dbconnection().getDBConnector();

export class Tablet extends ComputerSystem{
	private displaySize: number;
	private dimensions: string;
	private battery: number;
	private camera: boolean;
	
	constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, decommissioned:boolean, processor: string, ram: number,
                cpus: number, hardDrive: number, os: string, displaySize: number, dimensions: string, battery: number, camera: boolean){
                	super(id, weight, modelNumber, brand, price,decommissioned,"Tablet", processor, ram, cpus, hardDrive, os);
                	this.displaySize = displaySize;
                	this.dimensions = dimensions;
                	this.battery = battery;
                	this.camera = camera;
                	this.setModifyStrategy(new TabletModifyStrategy());
                }

    /****************************************************************
     * Accessors and Mutators
     ****************************************************************/
    public getDisplaySize(): number { return this.displaySize;  }
    public getDimensions(): string { return this.dimensions; }
    public getBattery(): number { return this.battery; }
    public getCamera(): boolean { return this.camera; }

    public setDisplaySize( dispSize: number) { this.displaySize = dispSize; }
    public setDimensions(dims: string) { this.dimensions = dims; }
    public setBattery(bat: number){this.battery = bat;}
    public setCamera(cam: boolean) { this.camera = cam; }

     /****************************************************************
    * Method to persist an object of type Tablet to the database
     ****************************************************************/
    public async save(): Promise<boolean> {
       return db.none("INSERT INTO tablets VALUES ('"+ this.getId() +"',"+ this.getWeight() +",'"+this.getModelNumber()+"','"+this.getBrand()+"',"+this.getPrice()+",'"+
           this.getProcessor()+"'," + this.getRam() + ","+this.getCpus()+","+this.getHardDrive()+",'"+this.getOs()+"',"+this.getDisplaySize()+",'"+
           this.getDimensions()+"',"+this.getBattery()+","+this.getCamera()+this.getDecommissioned()+")")
            .then(function(){
                console.log("Tablet added to db");
                return true;})
            .catch(function (err) {
                console.log("Error adding Tablet to the db " + err);
                return false;
            });
    }

     /*********************************************************************************************
    * Method to retrieve a persisted object in the database corresponding to the passed id value
     ********************************************************************************************/
    public static async find(id:string): Promise<Tablet>{
       return db.one("SELECT * FROM tablets WHERE id='" + id +"';")
            .then(function(row){
                return new Tablet(row.id,row.weight,row.modelnumber, row.brand, row.price, row.decommissioned,
                    row.processor, row.ram, row.cpus, row.harddrive, row.os, row.displaysize, row.dimensions, row.battery, row.camera)
            }).catch(function (err) {
            console.log("No matching object found: " + err);
            return null;
        });
    }

    /*******************************************************
     * Method to return all tablets saved in the database
     *******************************************************/
    public static async findAll(): Promise<Electronic[]>{
        return db.many('SELECT * FROM tablets;')
            .then(function(rows){
                let tablets: Electronic[] = new Array<Electronic>();
                for(let i=0; i< rows.length; i++){
                    if(!rows[i].decommissioned){
                        tablets.push(new Tablet(rows[i].id,rows[i].weight,rows[i].modelnumber, rows[i].brand, rows[i].price, rows[i].decommissioned,
                            rows[i].processor, rows[i].ram, rows[i].cpus, rows[i].harddrive, rows[i].os,
                            rows[i].displaysize, rows[i].dimensions, rows[i].battery, rows[i].camera));
                    }
                }
                return  tablets;
            }).catch(function (err){
                console.log("There was an error retrieving all tablets: " + err);
                return null;
            });
    }

    /*******************************************************
     * Method to update the current object in the database
     *******************************************************/
    public async modify(): Promise<boolean> {
        return db.none("UPDATE tablets SET weight=" + this.getWeight() + ", modelnumber='" +
            this.getModelNumber() + "', brand='" + this.getBrand() + "', price=" + this.getPrice() +
            ", processor='" + this.processor + "', ram=" + this.ram + ", cpus=" + this.cpus +
            ", harddrive=" + this.hardDrive + ", os='" + this.os + "', displaysize=" + this.getDisplaySize() +
            ", dimensions='" + this.getDimensions() + "', battery=" + this.getBattery() + ", camera=" + this.getCamera() +
            ", decommissioned=" + this.getDecommissioned() +
            " WHERE id = '"+ this.getId() + "';").
            then(function () {
                console.log("Tablet was modified.");
                return true;
        }).catch(function (err) {
            console.log("Could not update tablet: " + err);
            return false;
        });
    }

    /********************************************************
     * Method to remove the current object from the database
     ********************************************************/
    public async delete(): Promise<boolean> {
        this.setDecommissioned(true);
        return db.none("UPDATE tablets SET decommissioned=" + this.getDecommissioned() + " WHERE id = '" + this.getId() + "';").
            then(function () {
                console.log("Tablet was decommissioned.");
                return true;
        }).catch(function (err) {
            console.log("Could not decommission/delete Tablet:" + err);
            return false;
        });
    }
}