import * as uuid from "uuid";
import { User } from "./Models/user"
import { Client } from "./Models/client"
import { Admin } from "./Models/admin"
import { dbconnection } from "./Models/dbconnection"
import { afterMethod, beforeInstance, beforeMethod } from 'kaop-ts'
import { assert } from "./assert";
import validator = require('validator');
import {UnitOfWork} from "./unitofwork";

var db = new dbconnection().getDBConnector();

export class UserManagement {

    private static _instance: UserManagement;
	users: User[];
	unitOfWork: UnitOfWork;

	private constructor(){
		this.users = [];
		this.unitOfWork = UnitOfWork.getInstance();
		//Load all entities from the database
		this.loadClient();
		this.loadAdmin();
	}


    /**************************************************************************************
     * Getter method that returns the UserManagement instance; allows it to be a Singleton
     **************************************************************************************/
    public static getInstance() {
        if(!this._instance)
            this._instance = new this();
        return this._instance;
    }

	/*********************************************************
	* Load functions for all persisted users in the database
	 *********************************************************/
	 private async loadClient() {
        let clients: User[] = await Client.findAll();
        for(var i = 0; i< clients.length; i++)
        {
            this.users.push(clients[i]);
        }
	}

	private async loadAdmin() {
        let admins: User[] = await Admin.findAll();
        for(var i = 0; i< admins.length; i++)
        {
            this.users.push(admins[i]);
        }
	}

    /****************************************************
    * Function to retrieve a single user by id
     ****************************************************/
    @beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
	})
	@afterMethod(function(meta) {
        assert(meta.result!= null);
    })
	public getUserById(userId:string): User {
        for(var i = 0; i<this.users.length; i++)
        {
            if(this.users[i].getId() == userId)
                return this.users[i];
        }
        return null;
    }
    
    /****************************************************
     * Function to retrieve a single user by email
    ****************************************************/
    @beforeMethod(function(meta){
        assert(validator.isEmail(meta.args[0]), "Input parameter is not an Email");
    })
    @afterMethod(function(meta) {
        assert(meta.result != null, `No user found with email ${meta.args[0]}`);
    })
    public getUserByEmail(email:string): User {
        for(var i = 0; i<this.users.length; i++)
        {
            if(this.users[i].getEmail() == email)
               return this.users[i];
        }
        return null;
    }

    /***************************************
    * Function to add a new Client
     ****************************************/
    @beforeMethod(function(meta){
        let param = meta.args[0];
        for(let attr of ["fname" ,"lname" ,"email" ,"password" ,"address" ,"phone"])
            assert(param[attr] !== undefined && param[attr].match(/.*\S.*/) !== null, `${attr} cannot be empty or whitespace`);
        assert(param.fname.match(/^[a-zA-Z]+$/i), "First Name only accepts alphabet characters");
        assert(param.fname.length <= 20, "First Name is at most 20 characters long");
        assert(param.lname.match(/^[a-zA-Z]+$/i), "Last Name only accepts alphabet characters");
        assert(param.lname.length <= 20, "Last Name is at most 20 characters long");
        assert(validator.isEmail(param.email), "Email type is invalid");
        assert(param.email.length <= 30, "Email is at most 30 characters long");
        assert(param.password.length <= 128, "Password is at most 128 characters long");
        assert(param.address.length <= 30, "Address is at most 30 characters long");
        assert(param.phone.length <= 30, "Phone is at most 30 characters long");
        assert(param.phone.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i), "Phone number formats accepted [1234567890] [123-456-7890] [(123) 456-7890] [123 456 7890] [123.456.7890] [+91 (123) 456-7890]");
    })
    public addClient(data): boolean {
        let client: Client;
        client = new Client(uuid.v1(), data.fname, data.lname, data.email, data.password, data.address, data.phone, '');
        //client.save();
        this.users.push(client);
        this.unitOfWork.registerNew(client);
        return true;
    }

    /***************************************
    * Function to return all clients
     ****************************************/
    public getAllClients(): Client[] {
        let clients: Client[] = [];
        for(var i = 0; i<this.users.length; i++)
        {
            if(this.users[i] instanceof Client){
                clients.push(this.users[i] as Client);
            }
        }
        return clients
    }

    /**************************************
    * Function to delete a client
     **************************************/

    public deleteClient(id): boolean {
        let client: Client = this.getAllClients().find(client => client.id === id);
        this.users = this.users.filter(user => user.id !== id);
        client.delete();
        return true;
    }
}
