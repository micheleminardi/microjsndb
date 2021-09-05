# microjsndb

## _Simplest way to save JS object in a persistent json file_

microjsndb is a very simple javascript Class capable to save in a JSON file, persistent data.
microjsndb support CRUD operation:

| Operation | Function | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| Create    | Push     | add an element to the array data                    |
| Read      | Find     | find an element with some key and value information |
| Update    | Assign   | change value of some key or add new key             |
| Delete    | Delete   | delete an element                                   |

## Some code

First of all, we need to load all the necessary stuffs

```javascript
//Load the modules
const DB = require("./db");
// Create a new instance of database
database = new DB("test.json");

//all of our data is stored on database.data
```

### Create / Push

```javascript
// We are adding some information to the database
database.data.Push({ name: "michele", age: 24 });
```

### Read / Find

assuming our test.json are:

```json
[
  {
    "id": 1,
    "nome": "michele",
    "age": 24
  },
  {
    "id": 2,
    "nome": "michele",
    "age": 33
  }
]
```

```javascript
// We are adding some information to the database
found = database.data.Find({ age: 24 });
//found = [{id:1,"nome": michele, age:24}]

found = database.data.Find({ nome: "michele" });
//found = [{id:1,nome: "michele", age:24}, {id:2,nome: "michele", age:33}]
```

### Update / Assign

```javascript
// We are adding a new pair of key/value to the element with id=1
database.data.Assign({ id: 1, nome: "michele", age: 24, city: "Palermo" });
```

we can also combine the find method with assign:

```javascript
// We are finding all the element matching age = 24, we are selecting the first element of the resulting array, and a assigning to it the new key
database.data.Find({ age: 24 })[0].assign({ city: "Palermo" });
```

### Delete / Delete

```javascipt
// Delete an element from database
database.data.Delete(database.data.Find({ age: 24 })[0]);
```

### One more / Save

```javascipt
// For saving our data to the file, we need to call the save method
database.save()
```

# Nice, but ..

## microjsndb is a little more

All the methods showed up, are just some function added to JS's Array and Object, this means that we can just modify our
database.data var and, call on the end the database.save() method to save all of our data on the json file

# Example

```javascipt
const DB = require("./db");
const database = new DB("test.json");
database.data.Push({ name: "michele" });
database.data.Find({name:"michele"})[0].assign({citta:"Palermo"});
found = database.data.Find({ citta: "Palermo" });
database.data.Delete(found[0]);
process.on("exit", () => {
  database.save();
});
```
