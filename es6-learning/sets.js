let items = new Set(['one', 'two', 'three', 'one', 'two', 'three']);

items.add('four');
items.add('two');
items.clear();

console.log(items);