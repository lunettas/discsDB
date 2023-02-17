-- drop database discs;
-- CREATE DATABASE discs;
show databases;
show tables;

drop table silasdiscs;
drop table jcdiscs;

select * from testdiscs;
select * from silasdiscs;
select * from jcdiscs;

USE discs;
drop table silasdiscs;
CREATE TABLE silasdiscs (
ID INT PRIMARY KEY AUTO_INCREMENT,
Mold VARCHAR(100),
Plastic VARCHAR(100),
Brand VARCHAR(100),
Weight INT,
Speed INT,
Glide INT,
Turn DECIMAL(2,1),
Fade DECIMAL(2,1),
Slot ENUM( 'Putter', 'Mid-Range', 'Fairway Driver' , 'Control Driver', 'Distance Driver'),
Category ENUM('Main Bag', 'Side Bag', 'Collection', 'Backup', 'Emily', 'Sale / Trade'),
Color VARCHAR(100),
Stamp VARCHAR(100),
`Sleepy Scale` INT
);

USE discs;
drop table jcdiscs;
CREATE TABLE jcdiscs (
ID INT PRIMARY KEY AUTO_INCREMENT,
Mold VARCHAR(100),
Plastic VARCHAR(100),
Brand VARCHAR(100),
Weight INT,
Speed INT,
Glide INT,
Turn DECIMAL(2,1),
Fade DECIMAL(2,1),
Slot ENUM( 'Putter', 'Mid-Range', 'Fairway Driver' , 'Control Driver', 'Distance Driver'),
Category ENUM('Main Bag', 'Side Bag', 'Collection', 'Backup', 'Emily', 'Sale / Trade', 'Loan', 'Dalton', 'Max', 'Silas'),
Color VARCHAR(100),
Stamp VARCHAR(100),
`Sleepy Scale` INT
);


USE discs;
drop table testdiscs;
CREATE TABLE testdiscs (
ID INT PRIMARY KEY AUTO_INCREMENT,
Mold VARCHAR(100),
Plastic VARCHAR(100),
Brand VARCHAR(100),
Weight INT,
Speed INT,
Glide INT,
Turn DECIMAL(2,1),
Fade DECIMAL(2,1),
Slot ENUM( 'Putter', 'Mid-Range', 'Fairway Driver' , 'Control Driver', 'Distance Driver'),
-- Category ENUM('Main Bag', 'Side Bag', 'Collection', 'Backup', 'Emily', 'Sale / Trade'),
Color VARCHAR(100),
Stamp VARCHAR(100),
`Sleepy Scale` INT
);