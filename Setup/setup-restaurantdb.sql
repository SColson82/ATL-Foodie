--Create table restaurants
Create table "restaurants"  (
	"num" int,
	"business_id" varchar,
	"name" varchar,
	"address" varchar,
	"city" varchar,
	"state" varchar,
	"postal_code" varchar,
	"latitude" decimal,
	"longitude" decimal,
	"stars" decimal,
	"review_count" integer,
    "is_open" integer,
	"attributes" varchar,
	"categories" varchar,
    "hours" varchar,
	CONSTRAINT "pk_restaurants" PRIMARY KEY (
     "num"
)
	);




