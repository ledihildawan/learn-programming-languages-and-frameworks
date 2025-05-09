/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2xc5ajwspyp35i2",
    "created": "2024-01-28 12:41:41.471Z",
    "updated": "2024-01-28 12:41:41.471Z",
    "name": "pizzas",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5vr1dlai",
        "name": "title",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ovjbdffe",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ccoqjd3q",
        "name": "toppings",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 2,
          "values": [
            "mushrooms",
            "peppers",
            "sweetcorn",
            "olives",
            "pineaple"
          ]
        }
      },
      {
        "system": false,
        "id": "waboydmc",
        "name": "price",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2xc5ajwspyp35i2");

  return dao.deleteCollection(collection);
})
