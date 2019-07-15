const hours = 12;
let role;

if (!(hours >= 23)) {
  if (hours >= 0 && hours < 12 && role == "moderator") {
    console.log("Good Morning! " + (role ? role : ""));
  } else if (hours >= 12 && hours < 19 && role == "user.") {
    console.log("Good Afternoon! " + (role ? role : ""));
  } else {
    console.log("Good Evening! " + (role ? role : "Guest."));
  }
} else {
  console.log("Please enter valid format hours, 0 to 23.");
}

switch (role) {
  case 'guest':
    console.log('Guest User');
    break;
  case 'moderator':
    console.log('Moderator');
    break;
  default:
    console.log('Unknow User!');
    break;
}


for (let i = 0; i < 5; i++) {
  console.log('Hello world');
}

let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}

do {
  console.log(i);
  i++;
} while (i < 10);


const person = {
  name: "ledi",
  age: 22
};

for (let key in person) {
  console.log(key, person[key]);
}

const colors = ['red', 'green', 'blue'];
for (let color in colors) {
  console.log(colors[color]);
}

for (let color of colors) {
  console.log(color);
}

// break, continue