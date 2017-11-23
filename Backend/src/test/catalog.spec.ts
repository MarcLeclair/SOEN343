import { Catalog } from '../catalog';
import { WebPortal } from '../webportal';
import { dbconnection } from "../Models/dbconnection";
import { Monitor } from '../Models/monitor';
import { Desktop } from '../Models/desktop';
import {Tablet} from "../Models/tablet";
import {Laptop} from "../Models/laptop";
import { Electronic } from '../Models/electronic';
import { expect } from 'chai';
import 'mocha';
import * as uuid from "uuid";


var db = new dbconnection().getDBConnector();
let catalog = Catalog.getInstance();

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});

describe('Getting Products from Catalog', () => {
  
      it('return should be all of the electronics in the catalog', () => {
  
          
          let undef:any;
          //get all electronics
          const elec = catalog.getProductPage(undef,undef,undef,undef,undef,undef,undef,undef,undef);
          //compare products returned from products in catalog
          let anElec:Electronic;
          for(var i=0; i<elec.totalProducts; i++) {
            anElec = elec.products[i];
            for(var j=0; j<catalog.electronics.length;j++) {
              if(anElec.getId() === catalog.electronics[j].getId() )
              {
                expect(catalog.electronics[j]).to.equal(anElec);
              }
            }
          }

          //compare size of products in catalog with getProducts call
          expect(catalog.electronics.length).to.equal(elec.totalProducts);
          //verify electronic properties
          verifyElectronicProperties(elec.products);
  
      })
  });

  describe('Adding Products to Catalog', () => {
    
        it('add product in the catalog', () => {
    
            
            //get inital electronics length
            let numElecStart:number = catalog.electronics.length;
            //create electronics to add in catalog
            let mId:string = uuid.v1();
            let dId:string = uuid.v1();
            let lId:string = uuid.v1();
            let tId:string = uuid.v1();
            let monitor = new Monitor(mId, 1, "modelNumber99", "brand", 1, false, 1);
            let desktop = new Desktop(dId, 1, "modelNumber98", "brand", 1,false, "Intel",1,1,1,"Mac","13.5");
            let laptop = new Laptop(lId, 1, "modelNumber97", "brand", 1, false, "Intel",1,1,1,"Mac",13,1400,true,true);
            let tablet = new Tablet(tId, 1, "modelNumber96", "brand", 1, false, "Intel",1,1,1,"Mac",13,"13.5",1400,true);
            let electronics: Electronic[] = [];
            electronics.push(monitor);
            electronics.push(desktop);
            electronics.push(laptop);
            electronics.push(tablet);
            //get all electronics
  
            //test add product
            expect(catalog.addProduct(monitor)).equal(true);
            expect(catalog.electronics.length).equal(numElecStart + 1);
            expect(catalog.addProduct(desktop)).equal(true);
            expect(catalog.electronics.length).equal(numElecStart + 2);
            expect(catalog.addProduct(laptop)).equal(true);
            expect(catalog.electronics.length).equal(numElecStart + 3);
            expect(catalog.addProduct(tablet)).equal(true);
            expect(catalog.electronics.length).equal(numElecStart + 4);

            verifyElectronicProperties(electronics);

            //clean database from tests
            catalog.deleteProduct(mId);
            catalog.deleteProduct(dId);
            catalog.deleteProduct(lId);
            catalog.deleteProduct(tId);
        })
    });

    function verifyElectronicProperties(electronics:Electronic[])
    {
      for(let elec of electronics)
      {
        expect(elec).to.have.property('id');
        expect(elec).to.have.property('weight');
        expect(elec).to.have.property('modelNumber');
        expect(elec).to.have.property('brand');
        expect(elec).to.have.property('price');
        expect(elec).to.have.property('electronicType');
        if(elec.getElectronicType() === 'Monitor')
          expect(elec).to.have.property('size');
        else if(elec.getElectronicType() === 'Desktop')
        {
          expect(elec).to.have.property('processor');
          expect(elec).to.have.property('ram');
          expect(elec).to.have.property('cpus');
          expect(elec).to.have.property('hardDrive');  
          expect(elec).to.have.property('os');
          expect(elec).to.have.property('dimensions');
        }
        else if(elec.getElectronicType() === 'Laptop')
        {
          expect(elec).to.have.property('processor');
          expect(elec).to.have.property('ram');
          expect(elec).to.have.property('cpus');
          expect(elec).to.have.property('hardDrive');  
          expect(elec).to.have.property('os');
          expect(elec).to.have.property('displaySize');
          expect(elec).to.have.property('battery');
          expect(elec).to.have.property('camera');
          expect(elec).to.have.property('touchscreen');
        }
        else if(elec.getElectronicType() === 'Tablet')
        {
          expect(elec).to.have.property('processor');
          expect(elec).to.have.property('ram');
          expect(elec).to.have.property('cpus');
          expect(elec).to.have.property('hardDrive');  
          expect(elec).to.have.property('os');
          expect(elec).to.have.property('displaySize');
          expect(elec).to.have.property('dimensions');
          expect(elec).to.have.property('battery');
          expect(elec).to.have.property('camera');
        }
      }
    }

describe('Getting a Product by its ID', () => {

    it('return should be an electronic with certain ID', () => {

        // get the array of electronics
        const electronics = catalog.electronics;

        // iterate throughout the array to verify the electronics field are all equal when using getProduct method
        for (let electronic of electronics) {
            expect(electronic).to.equal(catalog.getProduct(electronic.getId()));
            expect(electronic.getElectronicType()).to.equal(catalog.getProduct(electronic.getId()).getElectronicType());
            expect(electronic.getModelNumber()).to.equal(catalog.getProduct(electronic.getId()).getModelNumber());
            expect(electronic.getBrand()).to.equal(catalog.getProduct(electronic.getId()).getBrand());
            expect(electronic.getPrice()).to.equal(catalog.getProduct(electronic.getId()).getPrice());
            expect(electronic.getWeight()).to.equal(catalog.getProduct(electronic.getId()).getWeight());
        }
    })
});



describe('Modify a Product by its ID', () => {


    it('true return if product is successfully modified', () => {
        
        let electronic = catalog.electronics[0];
        electronic.setPrice(1);
      

            // check if you can modify the product ( and return true);
            var result  = catalog.modifyProduct(electronic.getId(), electronic);
            result.then(function (result) {
                expect(result).to.equal(true);
            })
        //check to see if the product in the array is changed
            expect(electronic).to.equal(catalog.electronics[0]);

     
    });
});


describe('Deleting a Product by its ID', () => {


    it('true will be returned once product is deleted', () => {


        //add a product just verify that the a new item can be deleted too
        let monitor = new Monitor(null, 1, "a", "b", 1, false, 1);
        catalog.addProduct(monitor);

        // get the array of electronics
        const electronics = catalog.electronics;

        let newTestMonitor = electronics[electronics.length - 1];
        let valueShouldBeTrue: boolean = true;


        //verify i can delete the new monitor added above;
        var newMonitorDeleted = catalog.deleteProduct(newTestMonitor.getId());
        newMonitorDeleted.then(function (newMonitorDeleted) {
            expect(newMonitorDeleted).to.equal(valueShouldBeTrue);
        })

        //try deleting all the other items within our electronic catalogue
        let length = catalog.electronics.length;
        for (let i = 0; i <= length - 1; i++) {
            var value = catalog.deleteProduct(catalog.electronics[0].getId());
            value.then(function (value) {
                expect(value).to.equal(valueShouldBeTrue);
            });
        }

        //verify the array is null after deleting all the electronics, just to verify that the last loop effectively called deleteProduct(electronicID)
        expect(0).to.equal(catalog.electronics.length);
    });

});

