var nameVar = "Ledi";
var nameVar = "Tyan";
console.log("nameVar", nameVar);

let nameLet = "Joko";
nameLet = "Habibi";
console.log("nameLet", nameLet);

const nameConst = "Adi";
console.log("nameConst", nameConst);

// Block scoping
const fullName = "Ledi Hildawan";
let firstName;

if (fullName) {
  firstName = fullName.split(" ")[0];
  console.log(firstName);
}

console.log(fullName);
