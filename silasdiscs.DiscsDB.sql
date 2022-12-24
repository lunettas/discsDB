USE discs;
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
Category ENUM('Main Bag', 'Side Bag', 'Collection', 'Backup', 'Emily', 'Sale / Trade', 'Loan'),
Color VARCHAR(100),
Stamp VARCHAR(100),
`Sleepy Scale` INT
);

show tables;
show databases;
CREATE DATABASE discs;
drop table silasdiscs;
drop table jcdiscs;
drop database discs;

select * from silasdiscs;
select * from jcdiscs;

-- CREATE TABLE silaswant (

-- );

-- CREATE TABLE jcwant (

-- );
