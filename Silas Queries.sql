-- Color in rotation 
SELECT *
FROM(SELECT * FROM silasdiscs WHERE Color = 'White') AS whitediscs
WHERE Category = 'Side Bag' OR Category = 'Main Bag';

-- Flippy 
SELECT DISTINCT Mold, Speed, Glide, Turn, Fade, `Sleepy Scale`, Weight, Stability FROM
(SELECT Mold, Speed, Glide, Turn, Fade, `Sleepy Scale`, Weight, (Turn + Fade) AS Stability  FROM silasDiscs ORDER BY Stability) AS calStability
WHERE Weight !='Null'
ORDER BY Stability, Weight,`Sleepy Scale`;

-- Beefy 
SELECT DISTINCT Mold, Speed, Glide, Turn, Fade, `Sleepy Scale`, Weight, Stability FROM
(SELECT Mold, Speed, Glide, Turn, Fade, `Sleepy Scale`, Weight, (Turn + Fade) AS Stability  FROM silasDiscs ORDER BY Stability) AS calStability
WHERE Weight !='Null'
ORDER BY Stability DESC, Weight DESC,`Sleepy Scale` DESC;

-- Basic UNION
Select * From silasdiscs WHERE  Mold = 'Boss'  UNION ALL Select * FROM jcdiscs WHERE  Mold = 'Boss';

-- Find lightweight 
Select * From silasdiscs WHERE  Weight <=169  UNION ALL Select * FROM jcdiscs WHERE  Weight <=169;