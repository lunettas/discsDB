-- USE discs;
INSERT INTO jcdiscs (Mold, Plastic, Brand, Weight, Speed, Glide, Turn, Fade, Slot, Category, Color, Stamp, `Sleepy Scale`)
VALUES
	('Fierce', 'Special Blend', 'DISCRAFT', 172, 3, 4, -2, 0, 'Putter', 'Backup', 'Purple', 'Purple Shatter', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 174, 3, 4, -2, 0, 'Putter', 'Backup', 'Yellow', 'Rainbow Shatter', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Yellow', 'Rainbow Shatter', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Purple', 'Magenta Shatter - Slight dome top', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 174, 3, 4, -2, 0, 'Putter', 'Backup', 'Cream-Green', 'Jelly', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 169, 3, 4, -2, 0, 'Putter', 'Backup', 'Tan-Orange', 'Blue', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 169, 3, 4, -2, 0, 'Putter', 'Backup', 'Purple-Green', 'Blue', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 169, 3, 4, -2, 0, 'Putter', 'Backup', 'Tan', 'Jelly Bean', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 166, 3, 4, -2, 0, 'Putter', 'Backup', 'Pink-Cream', 'Gold', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 172, 3, 4, -2, 0, 'Putter', 'Backup', 'Green-Purple', 'Silver', 7),
    ('Fierce', 'Special Blend', 'DISCRAFT', 166, 3, 4, -2, 0, 'Putter', 'Backup', 'Blue-Pink', 'Teal', 7),
    ('Fierce', 'Z Swirl', 'DISCRAFT', 172, 3, 4, -2, 0, 'Putter', 'Backup', 'Orange-Yellow', '2022 Ledgestone Edition - Red Shatter', 7),
    ('Fierce', 'Z Swirl', 'DISCRAFT', 174, 3, 4, -2, 0, 'Putter', 'Backup', 'Orange-Green', '2022 Ledgestone Edition - Red', 7),
    ('Fierce', 'Z Swirl', 'DISCRAFT', 174, 3, 4, -2, 0, 'Putter', 'Backup', 'Gray-Green', '2022 Ledgestone Edition - Green Lasers', 7),
    ('Fierce', 'Z Swirl', 'DISCRAFT', 172, 3, 4, -2, 0, 'Putter', 'Backup', 'Yellow', '2022 Ledgestone Edition - Gold Holographic - black specks', 7),
    ('Fierce', 'Z Swirl', 'DISCRAFT', 172, 3, 4, -2, 0, 'Putter', 'Backup', 'Yellow1', '2022 Ledgestone Edition - Gold Holographic', 7),
    ('Fierce', 'Big Z', 'DISCRAFT', 172, 3, 4, -2, 0, 'Putter', 'Side Bag', 'Orange', '2021 Ledgestone Edition - Orange', 5),
    ('Fierce', 'Big Z', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Red', '2021 Ledgestone Edition - Purple', 7),
    ('Fierce', 'Big Z', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Green', '2021 Ledgestone Edition - Maroon', 7),
    ('Fierce', 'Big Z', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Pink', '2021 Ledgestone Edition - Green Star', 7),
    ('Fierce', 'Z Cryztal Sparkle', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Pink', '3X European Open', 7),
    ('Fierce', 'Z Cryztal Sparkle', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Pink', '3X European Open', 7),
    ('Fierce', 'Z Fly Dye', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Rainbow', 'Fierce logo', 7),
    ('Fierce', 'Z Fly Dye', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Rainbow', 'Fierce logo', 7),
    ('Fierce', 'Soft', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Pink', 'PP / Mountain design', 7),
    ('Fierce', 'Soft', 'DISCRAFT', 173, 3, 4, -2, 0, 'Putter', 'Backup', 'Pink', 'PP / Mountain design', 7),
    ('Fierce', 'ESP', 'DISCRAFT', 170, 3, 4, -2, 0, 'Putter', 'Backup', 'Unknown', 'Tour Series Edition - Tie Die blend', 7),
    
    ('Tomb', 'Swirly S-Blend', 'INFTD', 173, 3, 4, 0, 1, 'Putter', 'Backup', 'Yellow', 'Black', 7),
    
    ('Zone', 'Z Cryztal Flx Glo', 'DISCRAFT', 173, 4, 3, 0, 3, 'Putter', 'Backup', 'Orange', 'Get Freaky - Metallic Purple', 7)
    
--     ('PD', 'D-Line', 'Discmania')
	;

-- 'Main Bag', 'Side Bag', 'Collection', 'Backup', 'Emily', 'For Sale', 'Silas Trade', 'JC Trade'
select * from silasdiscs;
select * from silasdiscs where mold = 'Fierce';
select * from jcdiscs;
select * from jcdiscs where mold = 'Fierce';

-- hi, bye :)

