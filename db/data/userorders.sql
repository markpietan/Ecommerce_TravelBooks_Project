INSERT INTO userorders ("productid", amount, "userid") VALUES (floor(random() * (500-1+1) + 1)::int), floor(random() * (100-1+1) + 1)::int, floor(random() * (500-1+1) + 1)::int);
