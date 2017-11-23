import { dbconnection } from "./dbconnection";
import { Electronic} from "./electronic";
import { Cart } from "./cart";
import {isUndefined} from "util";
import {Igateway} from "./igateway";

var db = new dbconnection().getDBConnector();

export class Inventory implements Igateway{

    private static electronics: Electronic[] = new Array<Electronic>();
    private serialNumber: string;
	private inventoryType: Electronic;
    private lockedUntil: Date;
    private cartid: string;
    private returnDate: Date;

    constructor(serialNumber: string, inventoryType: Electronic) {
        this.serialNumber = serialNumber;
        this.inventoryType = inventoryType;
        this.lockedUntil = null;
        this.cartid = null;
        this.returnDate = null;
    }

    public setserialNumber(serialNumber:string): void{this.serialNumber = serialNumber;}
    public getserialNumber():string{return this.serialNumber;}

    public setinventoryType(inventoryType:Electronic): void{this.inventoryType = inventoryType;}
    public getinventoryType():Electronic{return this.inventoryType;}

    public setLockedUntil(lockedUntil:Date){this.lockedUntil = lockedUntil;}
    public getLockedUntil():Date{return this.lockedUntil;}

    public setCartId(cartid:string){this.cartid = cartid;}
    public getCartId():string{return this.cartid;}

    public setReturnDate(returnDate:Date): void{this.returnDate = returnDate;}
    public getReturnDate(): Date{return this.returnDate;}

    async modify(): Promise<boolean> { return Promise.resolve(true)};

    public static setElectronics(eletronics:Electronic[]):void{
        Inventory.electronics = eletronics;
    }
    public static getElectronics():Electronic[]{
        return Inventory.electronics;
    }
    public async delete(): Promise<boolean>{
        return db.none("DELETE FROM inventories WHERE \"serialNumber\" ='"+ this.serialNumber + "';")
            .then(function () {
                return true;
            }).catch(function (err) {
                console.log("No matching object found for delete:"+ err);
                return false;
            });
    }
    public async save(): Promise<boolean> {
		return db.none("INSERT INTO inventories VALUES ('"+this.serialNumber +"','"+this.inventoryType.getId()+"');")
			.then(function(){
				console.log("monitor added to db");
				return true;
			}).catch(function (err) {
				console.log("Error adding monitor to the db: " + err);
				return false;
			});
	}

    public static find(serialNumber:string): Promise<Inventory>
    {
       return db.one('SELECT * FROM inventories WHERE serialNumber =' + serialNumber + ';')
            .then(function (row) {
                return new Inventory(row.serialNumber, null);
            }).catch(function (err) {
                console.log("No matching object found: "+ err);
                return null;
            });
    }

    public static async findAll(): Promise<Inventory[]> {
        return db.many('SELECT * FROM inventories')
            .then(function (data) {
                let inventoryObjects: Inventory[] = new Array<Inventory>();
                for(let i=0;i<data.length;i++){
                    inventoryObjects.push(new Inventory(data[i].serialNumber, Inventory.getProduct(data[i].electronicID)));
                }
                return inventoryObjects;
            }).catch(function (err) {
                console.log("Error in getting all inventory:" + err);
                return null;
            });
    }

    /****************************************************************
     * Method to return all bought Inventories saved in the database
     *****************************************************************/
    public static async findAllPurchased(): Promise<{[key: string]: Inventory[]}>{
        const timeout = ms => new Promise(res => setTimeout(res, ms));
        await timeout(1000);

        return db.many('SELECT * FROM bought_inventory;')
            .then(function(rows) {
                let inventories: { [key: string]: Inventory[]} = {};

                for(let i=0; i < rows.length; i++) {
                    if (inventories[rows[i].cart_id] == null){
                        inventories[rows[i].cart_id] = new Array<Inventory>();
                    }

                    let currInventory: Inventory = new Inventory(rows[i].serialNumber, Inventory.getProduct(rows[i].electronicID));

                    if (rows[i].return_date != null) {
                        currInventory.setReturnDate(new Date(rows[i].return_date));
                    }

                    inventories[rows[i].cart_id].push(currInventory);
                }
                return inventories;
            }).catch(function (err) {
                console.log("There was an error retrieving all bought inventory: " + err);
                return null;
            });
    }

    public static getProduct(productId:string): Electronic {
		let elecIterator = Inventory.getElectronics();
		for(var iter = 0; iter < elecIterator.length; iter++){
			if(productId == elecIterator[iter].getId()) {
				return elecIterator[iter];
            }
		}
		return null;
    }
    
    //if lockedUntil is greater than the time now return true 
    //indicating the item is locked

    public isLocked(): Boolean
    {
        if(this.getLockedUntil() == null)
            return false; //item is available
        return this.getLockedUntil() > new Date();
    }

}