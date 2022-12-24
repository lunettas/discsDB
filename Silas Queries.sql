Use discs;
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