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
Category ENUM('Main Bag', 'Side Bag', 'Collection', 'Backup', 'Emily', 'Sale / Trade', 'Loan', 'Dalton', 'Max', 'Silas', 'Simon'),
Color VARCHAR(100),
Stamp VARCHAR(100),
`Sleepy Scale` INT
);

select * from testdiscs;
SELECT DISTINCT Mold, Speed, Glide, Turn, Fade, `Sleepy Scale`, Weight, Stability FROM
(SELECT Mold, Speed, Glide, Turn, Fade, `Sleepy Scale`, Weight, (Turn + Fade) AS Stability  FROM testdiscs ORDER BY Stability) AS calStability
WHERE Weight !='Null'
ORDER BY Stability DESC, Weight DESC,`Sleepy Scale` DESC;

USE discs;
INSERT INTO testdiscs (Mold, Plastic, Brand, Weight, Speed, Glide, Turn, Fade, Slot, Category, Color, Stamp, `Sleepy Scale`)
VALUES 
('Glitch', 'Neutron Soft', 'MVP', 154, 1, 7, 0, 0, 'Putter', 'Simon','Green', 'Matrix', 10),
('Spin', 'Neutron', 'MVP', 175, 2.5, 4, -2, 0, 'Putter','Simon', 'Pink', 'Stock', 10),
('Anode', 'Electron', 'MVP', 174, 2.5, 3, 0, .5, 'Putter', 'Simon','white', 'stock', 10),
('Anode', 'Electron', 'MVP', 174, 2.5, 3, 0, .5, 'Putter','Simon', 'white', 'stock', 10),
('Stabilizer ', 'Neutron', 'Streamline', 175, 3, 3.5, 0, 3, 'Putter','Simon', 'Blue', 'stock', 10),
('Proxy', 'Neutron Soft', 'Axiom', 175, 3, 3, -1, .5, 'Putter','Simon', 'Blue', 'Stock', 10),
('Pyro', 'Prism Proton', 'Axiom', 179, 5, 4, 0, 2.5, 'Mid-Range','Simon', 'Blue', 'Stock', 10),
('Hex', 'Neutron', 'Axiom', 179, 5, 5, -1, 1, 'Mid-Range', 'Simon', 'Purple', 'Stock', 10),
('Crave', 'Neutron', 'Axiom', 175, 6.5, 5, -1, 1, 'Mid-Range','Simon', 'Blue', 'Stock', 10),
('Deflector', 'Neutron', 'MVP', 178, 5, 3.5, 0, 4, 'Mid-Range','Simon', 'White', 'stock', 10),
('Hex', 'Eclipse', 'Axiom', 179, 5, 5, -1, 1, 'Mid-Range', 'Simon','White', 'Lizottle', 10),
('Resistor', 'Eclipse', 'MVP', 175, 6.5, 4, 0, 3.5, 'Mid-Range', 'Simon','Glow', 'stock', 10),
('Tesla', 'Proton', 'MVP', 175, 9, 5, -1, 2, 'Control Driver','Simon', 'Blue', 'Stock', 10),
('Fireball', 'Neutron', 'Axiom', 175, 9, 3.5, 0, 3.5, 'Control Driver', 'Simon', 'Blue', 'Stock', 10),
('Defy', 'Neutron', 'Axiom', 175, 11, 5, -1, 3, 'Distance Driver','Simon', 'Blue', 'Stock', 10),
('Trace', 'Neutron', 'Streamline', 175, 11, 5, -1, 2, 'Distance Driver','Simon', 'Orange', 'Stock', 10),
('Dimension', 'Neutron', 'MVP', 175, 14, 5, 0, 3, 'Distance Driver', 'Simon','White', 'Stock', 10),
('Defy', 'Neutron', 'Axiom', 175, 11, 5, -1, 3, 'Distance Driver','Simon', 'Orange', 'Stock', 10),
('Panic', 'Neutron', 'Axiom', 175, 13, 4, -.5, 3, 'Distance Driver','Simon', 'Yellow', 'Stock', 10),
('Delirium', 'Neutron', 'Axiom', 175, 14.5, 5, -.5, 3, 'Distance Driver','Simon', 'Pink', 'Stock', 10);