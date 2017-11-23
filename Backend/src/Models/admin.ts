import { dbconnection } from "./dbconnection";
import { User } from "./user";

var db =   new dbconnection().getDBConnector();

export class Admin extends User {
    constructor(id: string, fname: string, lname: string, email: string, password: string, token: string) {
        super(id, fname, lname, email, password, token);
    }

    public static async find(id:string){
    let admin: User;
    //return new Admin("id", "fname", "lname", "email", "password");
    db.one("SELECT * FROM admins WHERE id ='" + id + "';")
        .then(function (row) {
            admin = new Admin(row.id, row.fname, row.lname, row.email, row.password, row.token)
        }).catch(function (err) {
            console.log("No matching object found");
            return null;
        });
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(admin);
            }, 500);
    });
}
    public static async findByEmail(email: string)
    {
        //return new Admin("id", "fname", "lname", "email", "password");
        let admin: User;
        db.one("SELECT * FROM admins WHERE email ='"+ email + "';")
            .then(function (row) {
                console.log(row);
                admin = new Admin(row.id, row.fname, row.lname, row.email, row.password, row.token);
            }).catch(function (err) {
                console.log("No matching object found");
                console.log(err);
                return null;
            });
        return new Promise(resolve => {
                setTimeout(() => {
                  resolve(admin);
                }, 2000);
        });

    }

    public static async findAll(): Promise<User[]>{
        return db.many('SELECT * FROM admins')
            .then(function (data){
                let adminObjects: User[] = new Array<User>();
                for(var i=0; i<data.length; i++){
                    adminObjects.push(new Admin(data[i].id,data[i].fname,data[i].lname,
                    data[i].email, data[i].password, data[i].token));
                }
                return adminObjects;
            }).catch(function(err){
                console.log("Error: Admins could not be retrieved - " + err);
                return null;
            });
    }

    public async delete(): Promise<boolean>{
        return db.none("DELETE FROM admins WHERE id ='"+ this.id + "';")
            .then(function () {
                return true;
            }).catch(function(err){
                console.log("Error: No such object found for deletion - " + err);
                return false;
            });
    }
    
    public getType(): string {
        return Admin.name;
    }

}