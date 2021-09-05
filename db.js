const fs = require("fs");

module.exports = class DB {
  //Costruttore del database
  constructor(file, autoSave) {
    this.file = file;
    this.autoSave = autoSave;

    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "[]", () => {
        console.log("done");
      });
      this.data = [];
    } else {
      this.data = eval(fs.readFileSync(file).toString());
    }
  }

  //Sovrascrive il contenuto del file, con i nuovi dati
  save() {
    fs.writeFileSync(this.file, JSON.stringify(this.data), () => {});
  }
};

Array.prototype.Find = function (tofind) {
  let keys = Object.keys(tofind);
  let query = [];
  for (let key of keys) {
    if (isNaN(tofind[key])) {
      query.push(`element.${key} === "${tofind[key]}"`);
    } else {
      query.push(`element.${key} === ${tofind[key]}`);
    }
  }

  return this.filter((element) => eval(query.join(" && ")));
};

Array.prototype.Push = function (newData) {
  if (!this.includes({ newData })) {
    newData.id = this.LastIndex() + 1;
    this.push(newData);
  }
};

Array.prototype.LastIndex = function () {
  if (this.length === 0) {
    return -1;
  } else {
    return this.length;
  }
};

Array.prototype.Delete = function (toRemove) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === toRemove) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

Object.prototype.Assign = function (newData) {
  let keys = Object.keys(newData);
  let query = [];
  for (let key of keys) {
    this[key] = newData[key];
  }
};
