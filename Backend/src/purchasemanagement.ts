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
	})
	@afterMethod(function(meta) { 
		assert(PurchaseManagement.getInstance().checkItemAddedToCart(meta.args[0],meta.args[1]), "Item was not added to cart" )
	})
	public addToCart(userId: string, serialNumber: string): Boolean
	{
		let cart = this.getCart(userId);
		let inventoryObj:Inventory;
		for(let i = 0;i<this.catalog.inventories.length;i++)
		{
			if(this.catalog.inventories[i].getserialNumber() == serialNumber)
			{
				inventoryObj = this.catalog.inventories[i];
				break;
			}
		}
		if(inventoryObj.isLocked())
			return false; //obj is locked so it can't be added to cart
		else
		{
			//obj is available to be taken
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

	// checkout(userId: string): void

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");
	})
	@afterMethod(function(meta) {
		assert(meta.result != null);
	})
	public removeFromCart(userId: string, serialNumber: string):Inventory{
		let cart:Cart;
		for(let cart of this.activeCarts){
			if(cart.getUserId() == userId){
				let inventory= cart.getInventory()
				for( let i=0;i<inventory.length;i++){
					if(inventory[i].getserialNumber() == serialNumber){
						inventory[i].setCart(null);
						inventory[i].setLockedUntil(null);
						return inventory.splice(i, 1)[0];

					}
				}
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
}
