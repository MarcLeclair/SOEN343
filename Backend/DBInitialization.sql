CREATE DATABASE IF NOT EXISTS "DBpixelperformance";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS monitors;
CREATE TABLE monitors(
    id UUID DEFAULT uuid_generate_v1(),
	weight dec(4, 2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6,2),
    size int,
	decommissioned bool,
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS desktops;
CREATE TABLE desktops(
	id UUID DEFAULT uuid_generate_v1(),
	weight dec(4, 2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6, 2),
	processor varchar(20),
	ram int,
	cpus int,
	hardDrive int,
	os varchar(15),
	dimensions varchar(20),
	decommissioned bool,
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS tablets;
CREATE TABLE tablets(
    id UUID DEFAULT uuid_generate_v1(),
    weight dec(4,2),
    modelNumber varchar(20) UNIQUE,
    brand varchar(30),
    price dec(6,2),
    processor varchar(20),
    ram int,
    cpus int,
    hardDrive int,
    os varchar(15),
    displaySize dec(3,1),
    dimensions varchar(20),
    battery int,
    camera bool,
	decommissioned bool,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS laptops;
CREATE TABLE laptops(
	id UUID DEFAULT uuid_generate_v1(),
	weight dec(4,2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6,2),
	processor varchar(20),
	ram int,
	cpus int,
	hardDrive int,
	os varchar(15),
	displaySize dec(3,1),
	battery int,
	camera bool,
	touchscreen bool,
	decommissioned bool,
	PRIMARY KEY(id)
);



DROP TABLE IF EXISTS admins;
CREATE TABLE admins(

	id UUID DEFAULT uuid_generate_v1(),
	fname varchar(20),
	lname varchar(20),
	email varchar(30),
	password CHAR(128),
	token varchar(512),
	PRIMARY KEY(id)
);


DROP TABLE IF EXISTS clients CASCADE;
CREATE TABLE clients(

	id UUID DEFAULT uuid_generate_v1(),
	fname varchar(20),
	lname varchar(20),
	email varchar(30),
	password CHAR(128),
	address varchar(30),
	phone varchar(30),
	token varchar(512),
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS inventories CASCADE;
CREATE TABLE inventories(
	"serialNumber" UUID DEFAULT uuid_generate_v1(),
	"electronicID" UUID,
	PRIMARY KEY("serialNumber")
);

DROP TABLE IF EXISTS cart CASCADE;
CREATE TABLE cart(
	id UUID DEFAULT uuid_generate_v1(),
	client_id UUID REFERENCES clients(id) ON DELETE CASCADE ,
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS bought_inventory CASCADE;
CREATE TABLE bought_inventory(
	"serialNumber" UUID,
	"electronicID" UUID,
	cart_id UUID REFERENCES cart(id) ON DELETE CASCADE,
	return_date timestamp
);


