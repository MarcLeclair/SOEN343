import * as bcrypt from "bcrypt";

export abstract class User {
	public id: string;
	protected fname: string;
	protected lname: string;
	public email: string;
	public password: string;
	public token: string;
  
  constructor(id: string, fname: string, lname: string, email: string, password: string, token: string) {
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.token = token;
		this.password = (password.trim().length == 60 && password.split("$").length == 4) ? password : bcrypt.hashSync(password, 10);
	}

	public setId(id:string): void{
		this.id = id;
	}
	public getId():string{
		return this.id;
	}
	public setFName(fname:string): void{
		this.fname = fname;
	}
	public getFName():string{
		return this.fname;
	}
	public setLName(lname:string): void{
		this.lname = lname;
	}
	public getLName():string{
		return this.lname;
	}
	public setEmail(email:string): void{
		this.email = email;
	}
	public getEmail():string{
		return this.email;
	}
	public setPassword(password:string): void{
		this.password = password;
	}
	public getPassword():string{
		return this.password;
	}

	abstract getType(): string;
}
