import { Catalog } from "./catalog";
import { Cart } from "./Models/cart";
import {Inventory} from "./Models/inventory";
import {afterMethod, beforeInstance, beforeMethod} from 'kaop-ts'
import  validator = require('validator');
import assert = require('assert');
import * as uuid from "uuid";


export class PurchaseManagement {

	private static _instance: PurchaseManagement;
	catalog: Catalog;
	activeCarts: Cart[];
	purchaseRecords: Cart[];

	private constructor() {
		this.catalog = Catalog.getInstance();
		this.activeCarts = [];
		this.purchaseRecords = [];
		let dataPromises = new Array<Promise<Cart[]>>();

		dataPromises.push(Cart.findAllRecords());
		dataPromises[0].then((data) => {
			for (let i = 0; i<data.length; i++){
				this.purchaseRecords.push(data[i]);
			}
		});
	}

	public static getInstance() {
		if(!this._instance)
			this._instance = new this();
		return this._instance;
	}


	// startTransaction(userId: string): void

	// cancelTransaction(userId: String): void

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
	})
	@afterMethod(function(meta) {
		assert(meta.result != null, "Inventory within cart not found.");
	})
	public viewCart(userId: string): Inventory []{
		return this.getCart(userId).getInventory()
	}

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");
		assert(PurchaseManagement.getInstance().findInventoryBySerialNumber(meta.args[1]) != null,"serialNumber does not correspond to any item within Inventory");
		assert(!(PurchaseManagement.getInstance().checkItemIsLocked(meta.args[1])), "Item is unavaible");
		assert(PurchaseManagement.getInstance().getCart(meta.args[0]).getInventory().length < 7,"Your cart is already full. (7 Max)")
	})
	@afterMethod(function(meta) {
		assert(PurchaseManagement.getInstance().checkItemAddedToCart(meta.args[0],meta.args[1]), "Item was not added to cart" )
	})
	public addItemToCart(userId: string, serialNumber: string): Boolean
	{
		let cart = this.getCart(userId);
		let inventoryObj:Inventory;
		console.log(this.catalog.inventories);
		for(let i = 0;i<this.catalog.inventories.length;i++)
		{
			if(this.catalog.inventories[i].getserialNumber() == serialNumber)
			{
				inventoryObj = this.catalog.inventories[i];
				break;
			}
		}
		//obj is available to be taken since beforeMethod was successful
		//add obj to cart
		cart.getInventory().push(inventoryObj);
		//set obj lock time
		var futureDate = new Date(new Date().getTime() + 10*60000);
		inventoryObj.setLockedUntil(futureDate);

		//if obj was previously in another cart, remove it
		let prevCart = inventoryObj.getCart();
		if(prevCart != null)
			this.removeFromCart(prevCart.getUserId(),inventoryObj.getserialNumber());
		//set inventory's cart to this cart
		inventoryObj.setCart(cart);
		return true;
	}

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
	})
	@afterMethod(function(meta) {
		assert(meta.result != null, "There is no active cart for this user.");
	})
	public getCart(userId: string): Cart
	{
		for(var i=0;i<this.activeCarts.length; i++)
		{
			if(this.activeCarts[i].getUserId() == userId)
				return this.activeCarts[i];
		}
	}
	// viewPurchases(userId: string): Inventory []

	// returnInventory(userId: string, serialNumber: string): bool

    @beforeMethod(function(meta) {
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
        assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");

        let previousPurchasers: string[] = [];
        for (let i=0; i< meta.scope.purchaseRecords.length; i++){
          	previousPurchasers.push(meta.scope.purchaseRecords[i].getUserId());
		}

		// Client must be logged in --> this is checked by the passport module
        // The client must have previous purchases recorded in the system.
		assert(previousPurchasers.indexOf(meta.args[0]) >= 0, "User has no previous purchases");


	})
    @afterMethod(function(meta) {
		let allSerials: string[];
		let previouslyPurchased: Inventory[] = [];
		let previouslyPurchasedSerials: string[];

		for (let i=0; i< meta.scope.catalog.inventories.length; i++){
			allSerials.push(meta.scope.catalog.inventories[i].getserialNumber());
		}

		for (let i=0; i< meta.scope.purchaseRecords.length; i++){
			previouslyPurchased.concat(meta.scope.purchaseRecords[i].getInventory());
		}

		for (let i=0; i< previouslyPurchased.length; i++){
			previouslyPurchasedSerials.push(previouslyPurchased[i].getserialNumber());
		}


        // The return is recorded to the client’s account.
		assert(previouslyPurchasedSerials.indexOf(meta.args[1]) < 0, "The return was not recorded to the user's account");
        //The returned items are put back into the system.
		assert(allSerials.indexOf(meta.args[1]) >= 0, "The item was not successfully returned to the catalog.");
    })
    public returnInventory(userId: string, serialNumber: string): boolean{
		let allPurchases = this.purchaseRecords;
		let availableInventory = this.catalog;
        let soldInventories: { [key: string]: Inventory[]} = {};
        let returningInv: Inventory;
        let modifiedCartId: string;
        let returnSuccess: boolean = true;

        //for each purchase record belonging to this user,
		//collect all inventories that were sold
		for(let i=0; i< allPurchases.length; i++){
			if (allPurchases[i].getUserId() == userId){
                soldInventories[allPurchases[i].getId()] = allPurchases[i].getInventory();
			}
		}

		//Find the inventory to return
		for(let cartId in soldInventories){
			for (let i=0; i< soldInventories[cartId].length; i++){
				if (soldInventories[cartId][i].getserialNumber() == serialNumber){
					returningInv = soldInventories[cartId][i];
					modifiedCartId = cartId;
				}
			}
		}

		//set the cart and lockedUntil variables to null
		returningInv.setCart(null);
		returningInv.setLockedUntil(null);

		// //Modify the cart to remove the inventory from its records
		// for (let i=0; i<allPurchases.length; i++){
		// 	if (allPurchases[i].getId() == modifiedCartId){
		// 		returnSuccess = await allPurchases[i].removeInventoryRecord(serialNumber);
		// 	}
		// }

		if(returnSuccess) {
            availableInventory.returnInventory(returningInv);
            return returnSuccess;
        }
		else{
			console.log("Error processing return: could not remove purchase record for inventory with serial number: " + serialNumber)
			return false;
		}

    }

	// checkout(userId: string): void

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert( PurchaseManagement.getInstance().findCart(meta.args[0]) != null, "no cart is assiated with the user");
		assert( meta.scope.getCart(meta.args[0]).getInventory().length>0, "an empty cart cannot be checkedout" )
	})
	@afterMethod(function(meta) {
		var purchaseManagement = PurchaseManagement.getInstance();
		assert( purchaseManagement.findCart(meta.args[0]) == null, "cart was not removed from active carts");
		assert( purchaseManagement.findRecord(meta.args[0]) != null , "cart was not added to records");
		assert(purchaseManagement.ifInventoriesExist(purchaseManagement.findRecord(meta.args[0]).getInventory()), "inventories weren't removed from catalog")
	})
	public checkout(userId: string):void{
		let cart:Cart =  this.findCart(userId);
		for(let i=0; i< this.activeCarts.length;i++){
			if(this.activeCarts[i].getUserId() == userId){
				cart = this.activeCarts.splice(i, 1)[0]
				break;
			}
		}
		this.purchaseRecords.push(cart);
		for(let inventory of cart.getInventory()){
			this.catalog.checkoutInventory(inventory.getserialNumber());
		}

	}


	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");
		assert( PurchaseManagement.getInstance().findCart(meta.args[0])!= null, "no cart was found for associated user")
	})

	@afterMethod(function(meta) {
		assert(meta.result != null,"matching inventory could not be found");
	})
	public removeFromCart(userId: string, serialNumber: string):Inventory{
		let cart = this.findCart(userId);
		let inventory= cart.getInventory();
		for( let i=0;i<inventory.length;i++){
			if(inventory[i].getserialNumber() == serialNumber){
				inventory[i].setCart(null);
				inventory[i].setLockedUntil(null);
				return inventory.splice(i, 1)[0];
			}
		}
		return null;
	}

	// removeFromCart(userId: string, serialNumber: string): bool

	//Methods for Contract Programming
	private checkItemAddedToCart(userId:string, serialNumber:string):Boolean{
		for(let cart of this.activeCarts){
			if(cart.getUserId() == userId){
				for(let inventory of cart.getInventory()){
					if(inventory.getserialNumber() == serialNumber){
						return true;
					}
				}
			}
		}
		return false;
	}
	private checkItemIsLocked(givenItem:Inventory):Boolean{
		return givenItem.isLocked(); //return true if item in UNAVAILABLE
	}
	private findInventoryBySerialNumber(serialNumber):Inventory{
		let inventoryObj:Inventory;
		for(let i = 0;i<this.catalog.inventories.length;i++)
		{
			if(this.catalog.inventories[i].getserialNumber() == serialNumber)
			{
				inventoryObj = this.catalog.inventories[i];
				break;
			}
		}
		return inventoryObj;
	}

	public findCart( userId:string){
		for(let cart of this.activeCarts){
			if( cart.getUserId() == userId){
				return cart;
			}
		}
		return null
	}

	public findRecord( userId:string){
		for(let cart of this.purchaseRecords){
			if( cart.getUserId() == userId){
				return cart;
			}
		}
		return null
	}

	public ifInventoriesExist( inventories: Inventory[]): boolean{
		for( let inventory of inventories ){
			if( Catalog.getInstance().getInventory(inventory.getserialNumber()) != null ){
				return true;
			}
		}
		return false;
	}

}
