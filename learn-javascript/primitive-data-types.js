// number
// string
// boolean
// undefined
// null
// symbol

var length = 'hello'.length;
var length2 = new String('hello').length;

typeof 'hello'; // string
typeof new Sting('hello'); // object
typeof String('hello'); // string
typeof new String('hello').valueOf(); // string

typeof 10; // number
typeof new Number(10); // object
typeof Number(10); // number
typeof new Number(10).valueOf(); // number

var hello = 'hello';

hello.foo = 'foo';
hello.foo; // foo

var value = new Boolean(false);

if (value) {
  alert('foo');
}