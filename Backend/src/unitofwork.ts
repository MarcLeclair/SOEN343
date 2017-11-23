
import {Igateway} from "./Models/igateway";

export class UnitOfWork {

    private static _instance: UnitOfWork = null;
    private newProducts: Igateway[];
    private dirtyProducts: Igateway[];
    private deletedProducts: Igateway[];

    constructor(){
        this.newProducts = [];
        this.deletedProducts = [];
        this.dirtyProducts = [];
    }

    /*********************************************************
     * Method to return Singleton Catalog instance            *
     *********************************************************/
    public static getInstance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    public getNewProducts(): Igateway[] { return this.newProducts;}
    public getDirtyProducts(): Igateway[] { return this.dirtyProducts;}
    public getDeletedProducts(): Igateway[] { return this.deletedProducts;}

    public setNewProducts(newprod: Igateway[]) { this.newProducts = newprod;}
    public setDirtyProducts(dirty: Igateway[]) { this.dirtyProducts = dirty;}
    public setDeletedProducts(deleted: Igateway[]) { this.deletedProducts = deleted;}

    public registerNew(newProd: Igateway): void {
        this.newProducts.push(newProd);
    }

    public registerDirty(dirty: Igateway): void {
        this.dirtyProducts.push(dirty);
    }

    public registerDeleted(deleted: Igateway): void {
        this.deletedProducts.push(deleted);
    }

    protected saveNewProducts(): void {
        for(let i=0; i<this.newProducts.length; i++){
            this.newProducts[i].save();
        }
        this.newProducts = [];
    }

    protected deleteUnusedProducts(): void {
        for(let i=0; i<this.deletedProducts.length; i++){
            this.deletedProducts[i].delete();
        }
        this.deletedProducts = [];
    }

    protected updateDirtyProducts(): void {
        for (let i=0; i<this.dirtyProducts.length; i++){
            this.dirtyProducts[i].modify();
        }
        this.dirtyProducts = [];
    }

    public commit(): void {
        this.saveNewProducts();
        this.deleteUnusedProducts();
        this.updateDirtyProducts();
        console.log("Unit of work done working");
    }
}