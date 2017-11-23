DELETE FROM desktops;
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(24,'DCM231234','Dell',785.55,'Intell i7',16,8,1000,'Windows','47.5x47.5x20',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(26,'DCM459872','Dell',1002.65,'Intell i7',12,4,500,'Windows','45x47.5x18',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(19,'DCM023684','Dell',2058.33,'Intell i7',32,4,2000,'Windows','40x45x20',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(26,'M5M369854','HP',754.36,'AMD FX 8350',8,8,500,'Windows','46x47x16',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(30,'M5M658742','HP',875.75,'AMD FX 9590',8,2,1000,'Windows','48x45x21',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(55,'M5M698752','HP',952.40,'AMD Ryzen',16,4,500,'Windows','47x47.5x20',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(89,'M5M215741','HP',1010.52,'Intell i5',16,8,240,'Windows','47.5x47.5x20',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(22,'DTC04P91234','Lenovo',500.36,'Intell i5',6,2,128,'Windows','45x48x17',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(20,'DTC04P91984','Lenovo',870.20,'AMD FX 8350',12,4,500,'Windows','44x45x19',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(34,'DTC11H88704','Lenovo',647.22,'Intell i5',8,8,1000,'Windows','48x46x22',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(16,'WLP3258JK','Acer',706.35,'Intell i7',12,4,240,'Windows','42x40x20',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(40,'WLP3402DC','Acer',687.25,'Intell i5',8,4,128,'Windows','47.5x47.5x20',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(12,'WLP1120NS','Acer',769.36,'AMD Ryzen',6,8,500,'Windows','48x47.5x15',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(15,'WLP8549CG','Acer',968.36,'Intell i5',16,8,500,'Windows','45x45x20',False);
INSERT INTO desktops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions, decommissioned) VALUES(30,'WLP1299AH','Acer',642.01,'Intell i7',8,8,500,'Windows','46.2x44x15',False);

DELETE FROM tablets;
INSERT INTO tablets(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, displaySize, dimensions, battery, camera, decommissioned) VALUES(19, 'A1432', 'Apple', 579.00, 'Apple A9', 2, 2, 128, 'IOS', 9.7, '240x169.5x7.5', 32.4, True,False);
INSERT INTO tablets(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, displaySize, dimensions, battery, camera, decommissioned) VALUES(21, 'A1435', 'Apple', 1299.00, 'Apple A10X', 4, 6, 512, 'IOS', 10.5, '250.6x174.1x6.1', 30.4, True,False);
INSERT INTO tablets(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, displaySize, dimensions, battery, camera, decommissioned) VALUES(20, 'SM-T1818WZKEXAC', 'Samsung', 699.00, 'T810', 3, 8, 256, 'Android', 9.7, '237.3x169x5.6', 5870, True,False);
INSERT INTO tablets(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, displaySize, dimensions, battery, camera, decommissioned) VALUES(20, 'Z500M', 'Asus', 357.76, 'MTK MT8176', 4, 4, 64, 'Android', 9.7, '240.5x163.7.5x5.8', 22, True,False);

DELETE FROM laptops;
INSERT INTO laptops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, displaySize, battery, camera, touchscreen, decommissioned) VALUES (42,'UX330UA','Asus',1049.00,'Intel Core i5',8,2,256,'Windows',13.3,10.5,True,False,False);
INSERT INTO laptops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, displaySize, battery, camera, touchscreen, decommissioned) VALUES (56,'AN515-51-56U0','Acer',999.00,'Intel Core i5',8,4,256,'Windows',15.6,11.2,True,False,False);
INSERT INTO laptops(weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, displaySize, battery, camera, touchscreen, decommissioned) VALUES (77,'i3542-5000BK','Dell',369.50,'Intel Core i3',4,2,500,'Windows',15.6,9.6,True,True,False);



DELETE FROM monitors;
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(13 ,'OLEDLG21X','LG', 432.00, 21,False);
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(17 ,'OLEDLG24X','LG', 656.00, 24,False);
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(20 ,'OLEDLG27X','LG', 734.00, 27,False);
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(12 ,'SAMXK21','Samsung',754.00, 21,False);
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(16 ,'SAMXK24','Samsung',1219.99, 24,False);
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(19 ,'SAMXK27','Samsung',1719.99, 27,False);
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(11 ,'DELLX21','Dell',419.18, 21,False);
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(15 ,'DELLX24','Dell',519.18, 24,False);
INSERT INTO monitors(weight, modelNumber, brand, price, size, decommissioned) VALUES(18 ,'DELLX27','Dell',4719.18, 27,False);

DELETE FROM admins;
INSERT INTO admins(fname, lname, email, password, token) VALUES('Super','Admin','admin1@pp.com','$2a$10$bh6.lfqek5oYNz334kigFeQzKgn5YMrvlk94FAzD9gmVcLOAO39Ku', ''); /*Password is bcrypt hashed string "AdminPassword123"*/
INSERT INTO admins(fname, lname, email, password, token) VALUES('Super','Admin','admin2@pp.com','$2a$10$bh6.lfqek5oYNz334kigFeQzKgn5YMrvlk94FAzD9gmVcLOAO39Ku', ''); /*Password is bcrypt hashed string "AdminPassword123"*/

DELETE FROM clients CASCADE ;
INSERT INTO clients(fname, lname, email, password, address, phone, token) VALUES('John','Smith','client1@gmail.com','$2a$10$kVJwf.L05kDDhSVbZvOeRuE9OOrVDEMelaHzkSbiSC8XJLa5tpnWq','Canada','552-5551', ''); /*Password is bcrypt hashed string "ClientPassword123"*/
INSERT INTO clients(fname, lname, email, password, address, phone, token) VALUES('Bob','Stewart','client2@gmail.com','$2a$10$kVJwf.L05kDDhSVbZvOeRuE9OOrVDEMelaHzkSbiSC8XJLa5tpnWq','Canada','552-5552', ''); /*Password is bcrypt hashed string "ClientPassword123"*/
INSERT INTO clients(fname, lname, email, password, address, phone, token) VALUES('Kelly','Lane','client3@gmail.com','$2a$10$kVJwf.L05kDDhSVbZvOeRuE9OOrVDEMelaHzkSbiSC8XJLa5tpnWq','Canada','552-5553', ''); /*Password is bcrypt hashed string "ClientPassword123"*/

DELETE FROM inventories;
INSERT INTO inventories("electronicID") SELECT id FROM monitors;
INSERT INTO inventories("electronicID") SELECT id FROM monitors;
INSERT INTO inventories("electronicID") SELECT id FROM tablets;
INSERT INTO inventories("electronicID") SELECT id FROM tablets;
INSERT INTO inventories("electronicID") SELECT id FROM laptops;
INSERT INTO inventories("electronicID") SELECT id FROM laptops;
INSERT INTO inventories("electronicID") SELECT id FROM desktops;
INSERT INTO inventories("electronicID") SELECT id FROM desktops;