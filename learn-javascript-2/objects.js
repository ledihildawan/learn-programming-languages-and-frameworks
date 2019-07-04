var account = {
  cash: 1200,
  _name: 'Default',
  withdraw: function(amount) {
    this.cash -= amount;
    console.log('Withdrew ' + amount + ', new cash reserve is: ' + this.cash);
  }
};

Object.defineProperty(account, 'name', {
  get: function() {
    return 'Hello';
  },
  set: function(name) {
    this._name = name;
  }
});

for (let key in account) {
  console.log(key);
}