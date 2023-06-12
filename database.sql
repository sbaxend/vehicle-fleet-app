
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

--This Table stores the users Cars when added along with a reference to the user
CREATE TABLE "cars" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_make" VARCHAR,
    "vehicle_year" INT,
    "vehicle_model" VARCHAR (50),
    "user_id" INT REFERENCES "user"(id)
);

ALTER TABLE "cars"
ADD COLUMN "body_style" VARCHAR(50);

--This Table is for each seperate Vehicle history
CREATE TABLE "history" (
    "id" SERIAL PRIMARY KEY,
    "history_description" VARCHAR (1000),
    "car_id" INTEGER REFERENCES "cars"(id),
    "history_notes" VARCHAR (1000),
    "history_date" DATE
);

--This is the Wishlist of each Vehicle
CREATE TABLE "wishlist" (
    "id" SERIAL PRIMARY KEY,
    "wishlist_description" VARCHAR (1000),
    "car_id" INTEGER REFERENCES "cars"(id)
);
