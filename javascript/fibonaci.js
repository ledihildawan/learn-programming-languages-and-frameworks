const number = 10;

let n1 = 0;
let n2 = 1;
let nexTerm = null;

for (let i = 0; i < number; i++) {
  console.log(n1);
  nexTerm = n1 + n2;
  n1 = n2;
  n2 = nexTerm;
}
