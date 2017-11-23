import { UserManagement} from '../usermanagement';
import { WebPortal } from '../webportal';
import { dbconnection } from "../Models/dbconnection";
import { expect } from 'chai';
import { Client } from "../Models/client";
import { UnitOfWork } from '../unitofwork';
import 'mocha';

var db = new dbconnection().getDBConnector();
let userManagement = UserManagement.getInstance();
//let unitOfWork = UnitOfWork.getInstance();

let testEmail = "test@test.com";

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});

describe('Getting all clients', () => {

  it('should return a list of all clients', () => {
    
    const users = userManagement.getAllClients();
    
    db.many('SELECT * FROM clients')
    .then(function (data) {
        for(var i=0; i<data.length; i++){
            let client = new Client(data[i].id,data[i].fname,data[i].lname,
            data[i].email, data[i].password, data[i].address, data[i].phone, '');
            expect(users[i]).to.deep.equal(client);
        }
    });
    for(let user of users){
      expect(user).to.have.property('id');
      expect(user).to.have.property('fname');
      expect(user).to.have.property('lname');
      expect(user).to.have.property('email');
      expect(user).to.have.property('id');
      expect(user).to.have.property('address');
      expect(user).to.have.property('phone');
    }
  });

});

describe('Adding a new client', () => {

  it('should add a new client', () => {

    let body = {
      fname: "Testfirst",
      lname: "Testlast",
      email: testEmail,
      password: "1",
      address: "1",
      phone: "1234567890"
    };

    userManagement.addClient(body);
    let client = userManagement.getUserByEmail(body.email);

    expect(client).to.have.property('id');
    expect(client).to.have.property('fname');
    expect(client).to.have.property('lname');
    expect(client).to.have.property('email');
    expect(client).to.have.property('id');
    expect(client).to.have.property('address');
    expect(client).to.have.property('phone');

  });

});

describe('Deleting a client', () => {

  it('should delete a client', () => {

    let user = userManagement.getUserByEmail(testEmail);

    // should be returning true if the operation completes successfully
    expect(userManagement.deleteClient(user.getId())).to.equal(true);

    // should throw an error if the user is not found
    expect(userManagement.getUserById.bind(userManagement, user.getId())).to.throw();

  });

});
