import { dbconnection } from "./dbconnection";
import { User } from "./user";
import {Igateway} from "./igateway";

var db =   new dbconnection().getDBConnector();

export class Client extends User implements Igateway{

	private address: string;
	private phone: string;

    constructor(id: string, fname: string, lname: string, email: string, password: string, address: string, phone: string, token: string) {
        super(id, fname, lname, email, password, token);
        this.address = address;
        this.phone = phone;
    }

    public setAddress(address:string): void{
        this.address = address;
    }
    public getAddress():string{
        return this.address;
    }
    public setPhone(phone:string): void{
        this.phone = phone;
    }
    public getPhone():string{
        return this.phone;
    }

    public async delete(): Promise<boolean>{
    return db.none("DELETE FROM clients CASCADE WHERE id ='"+ this.id + "';")
        .then(function () {
            return true;
        }).catch(function (err) {
            console.log("No matching object found for delete:"+ err);
            return false;
        });
    }

    public static find(id:string): User
    {
        let client: User;
        db.one('SELECT * FROM clients WHERE id =' + id + ';')
            .then(function (row) {
                client = new Client(row.id, row.fname, row.lname, row.email, row.password, row.address, row.phone, row.token);
            }).catch(function (err) {
                console.log("No matching object found: "+ err);
                return null;
            });
        return client;
    }

    public static async findAll(): Promise<User[]> {
        return db.many('SELECT * FROM clients')
            .then(function (data) {
                let clientObjects: User[] = new Array<User>();
                for(var i=0; i<data.length; i++){
                    clientObjects.push(new Client(data[i].id,data[i].fname,data[i].lname,
                    data[i].email, data[i].password, data[i].address, data[i].phone, data[i].token));
                }
                return clientObjects;
            }).catch(function (err) {
                console.log("Error in getting all clients:" + err);
                return null;
            });
    }
    
    /******************************************************
    * Method to persist Client objects in the database *
     ******************************************************/
    public async save(): Promise<boolean> {
        let queryValues = ["'"+this.getId()+"'","'"+this.getFName()+"'","'"+this.getLName()+"'","'"+this.getEmail()+"'",
                           "'"+this.getPassword()+"'","'"+this.getAddress()+"'", "'"+this.getPhone()+"'", "'"+this.token+"'"];
        return db.none("INSERT INTO clients VALUES (" + queryValues.join(',') + ")")
            .then(function() {
                console.log("New Client was added to the database.");
                return true;
            })
            .catch(function (err) {
                console.log("Error adding Client to the db: " + err);
                return false;
            });
    }

    public getType(): string {
        return Client.name;
    }

    async modify(): Promise<boolean> { return Promise.resolve(true)};
}
