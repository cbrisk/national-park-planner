set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userFirstName" TEXT NOT NULL,
	"userLastName" TEXT NOT NULL,
	"userEmail" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reviews" (
	"reviewId" serial NOT NULL,
	"userId" integer NOT NULL,
	"parkCode" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "visited" (
	"userId" serial NOT NULL,
	"parkCode" TEXT NOT NULL,
	CONSTRAINT "visited_pk" PRIMARY KEY ("userId","parkCode")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "itineraries" (
	"itineraryId" serial NOT NULL,
	"userId" integer NOT NULL,
	"parkCode" TEXT NOT NULL,
	CONSTRAINT "itineraries_pk" PRIMARY KEY ("itineraryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "itineraryItems" (
	"itineraryItemId" serial NOT NULL,
	"itineraryId" integer NOT NULL,
	"thingToDo" TEXT NOT NULL,
	"completed" BOOLEAN NOT NULL,
	CONSTRAINT "itineraryItems_pk" PRIMARY KEY ("itineraryItemId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "visited" ADD CONSTRAINT "visited_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "itineraryItems" ADD CONSTRAINT "itineraryItems_fk0" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("itineraryId");
