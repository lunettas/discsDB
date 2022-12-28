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
Select * From silasdiscs UNION ALL Select * FROM jcdiscs;

-- Find lightweight 
Select * From silasdiscs WHERE  Weight <=169  UNION ALL Select * FROM jcdiscs WHERE  Weight <=169;

-- Flight numbers
Select DISTINCT Mold, Speed, Glide, Turn, Fade, (Turn + Fade) AS Stability From silasdiscs
ORDER BY Speed, Stability
;

Select DISTINCT Mold, Speed, Glide, Turn, Fade, (Turn + Fade) AS Stability From silasdiscs
UNION 
Select DISTINCT Mold, Speed, Glide, Turn, Fade, (Turn + Fade) AS Stability From jcdiscs
ORDER BY Speed, Stability
;

SELECT Mold, COUNT(*) AS Count FROM silasdiscs 
GROUP BY Mold ORDER BY Count DESC LIMIT 5;

SELECT Mold, COUNT(*) AS Count FROM jcdiscs
GROUP BY Mold ORDER BY Count DESC LIMIT 5;

SELECT Mold, COUNT(*) AS Count FROM
(SELECT * FROM silasdiscs UNION ALL Select * FROM jcdiscs) AS totalDiscs
GROUP BY Mold ORDER BY Count DESC;

