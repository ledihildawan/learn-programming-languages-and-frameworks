const date = new Date();
let methods;

methods = date.getSeconds();
methods = date.getFullYear();
methods = date.setMinutes(date.getMinutes() + 10);
methods = date.toLocaleString('id-ID', {
  year: '2-digit',
  month: 'short',
  weekday: 'long'
});

console.log(methods);