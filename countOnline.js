let users = {
  Alan: {
    age: 27,
    online: false
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: false
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function countOnline(obj) {
  const users = [];
  let totalOnline = 0;

  for (let user in obj) {
    users.push(user);
  }

  for (let i = 0; i < users.length; i++) {
    if (obj[users[i]].online === true) {
      totalOnline++;
    }
  }

  return totalOnline;
}

console.log(countOnline(users));