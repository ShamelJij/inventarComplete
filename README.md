<div>
    <img src="/inventar/public/src/dlscencrp.png" alt="deltastone" title="deltastone">
</div>

# Inventar
> a fullstack application for an inventory 

### Backend: 
CouchDB

### Frontend:
BootStrap + JS

<div>
    <img src="https://picsum.photos/id/238/1200/300" alt="Snow" title="modernization!">
</div>

## Pages:
1. person
2. location
3. inventory

<div>
    <img src="https://picsum.photos/1200/300" alt="Snow" title="modernization!">
</div>

## Project Tree:

```
\---inventar
    |   .editorconfig
    |   .eslintrc.json
    |   .gitignore
    |   app.js
    |   package.json
    |   
    +---bin
    |       www
    |       
    +---config
    |       errorlist.json
    |       localhost.json
    |       person.json
    |       
    +---couchdb_design
    |   |   validateCouchDb.js
    |   |   
    |   \---inventar
    |           _design_inventory.json
    |           _design_location.json
    |           _design_person.json
    |           
    +---public
    |   +---dist
    |   |   |   app.js
    |   |   |   index.html
    |   |   |   inventory.js
    |   |   |   location.js
    |   |   |   person.js
    |   |   |   settings.js
    |   |   |   
    |   |   \---stack
    |   |           appop.js
    |   |           databaseop.js
    |   |           Documentop.js
    |   |           indexop.html
    |   |           inventoryop.js
    |   |           locationop.js
    |   |           personsop.js
    |   |           
    |   +---languages
    |   |       de.json
    |   |       en.json
    |   |       
    |   +---src
    |   |       dlscencrp.png
    |   |       
    |   \---Swagger
    |       \---docs
    |               swagger.yaml
    |               
    +---router_controllers
    |       inventoriesController.js
    |       locationsController.js
    |       personsController.js
    |       
    \---server
        +---inventarUtils
        |       ApplicationError.js
        |       
        +---inventories
        |       Inventories.js
        |       InventoriesDB.js
        |       Inventory.js
        |       
        +---locations
        |       Location.js
        |       Locations.js
        |       LocationsDB.js
        |       
        +---persons
        |       Person.js
        |       Persons.js
        |       PersonsDB.js
        |       
        \---superclass
                Database.js
                Document.js
```

<center>
    <img src="/inventar/public/src/Teammee.png" alt="invention" title="modern">
</center>
