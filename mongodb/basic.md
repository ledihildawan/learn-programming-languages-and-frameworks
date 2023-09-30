# MongoDB

## Intro

show dbs;

use flightData;

```
db.flight.insertOne({
  "departureAirport": "MUC",
  "arrivalAirport": "SFO",
  "aircraft": "Airbus A380",
  "distance": 12000,
  "interconental": true
});
```

db.flightData.find().pretty();

## CRUD Operations

Create

```
insertOne(data, options)
insertMany(data, options)
```

Example

```
db.flightData.insertMany([
  {
    "departureAirport": "MUC",
    "arrivalAirport": "SFO",
    "aircraft": "Airbus A380",
    "distance": 12000,
    "interconental": true
  },
  {
    "departureAirport": "LHR",
    "arrivalAirport": "TXL",
    "aircraft": "Airbus A320",
    "distance": 950,
    "interconental": false
  },
])
```

Update

```
updateOne(filter, data, options)
updateMany(filter, data, options)
replaceOne(filter, data, options)
```

Example

```
db.flightData.updateOne({ departureAirport: "TXL" }, { $set: { marker: "toDelete" } });
db.flightData.update({}, { $set: { marker: "toDelete" }} });
db.flightData.updateMany({}, { $set: { status: { description: "on-time", lastUpdated: "1 hour ago", details: { responsible: ["Ledi Hildawan", "Max"] } } }} });
```

Read

```
find(filter, options)
findOne(filter, options)
```

Example

```
db.flightData.find({ name: "Max" })
db.flightData.find({ intercontinental: true }).pretty()
db.flightData.find({ distance: 1200 }).pretty()
db.flightData.find({ distance: { $gt: 12000 } }).pretty()
db.passengers.find({ distance: { $gt: 12000 } }).forEach((passengersData) => { printjson(pasengerData) })
db.flightData.find({ distance: { $gt: 12000 } }, { name: 1, _id: 0 }).pretty()
db.flightData.findOne({ arrivalAirport: "TXL" ]).status.details.responsible
db.flightData.findOne({ status.details.responsible: "Max" ]).pretty()
```

Delete

```
deleteOne(filter, options)
deleteMany(filter, options)
```

Example

```
db.flightData.deleteOne({ departureAirport: "TXL" });
db.flightData.deleteMany({ marker: "toDelete" });
```

## Atomic Operators

ObjectId
$set
$gt
$jsonSchema
$lt
$gt
$in
$nin
$or
$not
$and
$not
$ne
$exists
$regex
$expr
$cond
$elemMatch
$slice
