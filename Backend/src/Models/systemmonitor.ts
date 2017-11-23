import {LogItem } from "./logitem";

export class SystemMonitor{

    private static _instance: SystemMonitor;
    private logItems :LogItem[] = new Array<LogItem>();

    public static getInstance() {
        if(!this._instance)
            this._instance = new this();
        return this._instance;
    }

    public logRequest(userId: String, description: String, tokenId: String): void {
        this.logItems.push(new LogItem(userId, new Date(), description, tokenId));
    }

    public getRecords(userId: String): LogItem[] {
        let records = new Array<LogItem>();

        for (let i = 0; i <this.logItems.length; i ++){
            if (this.logItems[i].getUserId() == userId){
                records.push(this.logItems[i]);
            }
        }

        return records;
    }

}