const { Collection } = require('../build');

const coll = new Collection({
  abcd: function a() {
    return 'a';
  }
});

console.log(coll);
console.log(Object.prototype.toString(coll));